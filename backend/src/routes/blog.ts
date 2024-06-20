import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
  Variables: {
    userId: string;
  };
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("authorization");
    const token = authHeader?.split(" ")[1];
    if (token) {
      const response = await verify(token, c.env.JWT_SECRET);
      if (response) {
        const responseString = JSON.stringify(response.id);
        c.set("userId", responseString);
        await next();
      } else {
        c.status(403);
        return c.json({ error: "unorthorized" });
      }
    } else {
      console.log("Pass correct headers");
    }
  } catch (e) {
    console.log(e);
    return c.text("Wrong headers");
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = JSON.parse(c.get("userId"));
  console.log(authorId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.text("Error while fetching");
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const updateBlog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    console.log(updateBlog);
    return c.json({
      id: updateBlog.id,
      msg: "Blog updated",
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.text("Error while updating the blog");
  }
});

// Todo: Implement Pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bulkBlogs = await prisma.post.findMany();
  return c.json({
    bulkBlogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const getBlogs = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    return c.json({
      getBlogs,
    });
  } catch (e) {
    c.status(400);
    return c.text("Cannot get the blogs");
  }
});
