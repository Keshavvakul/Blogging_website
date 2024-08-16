import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { updateBlogInput, createBlogInput } from "@keshavvakul/common";

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
    const token = c.req.header("authorization");
    console.log(token);
    if (token) {
      const response = await verify(token, c.env.JWT_SECRET);
      if (response) {
        console.log(response);
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
  if (!body || !body.title || !body.content) {
    c.status(400);
    return c.text("Please pass all inputs");
  }
  const authorId = JSON.parse(c.get("userId"));
  console.log(authorId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.text("Wrong inputs");
    }
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

blogRouter.put("/:id", async (c) => {
  const rawId = c.req.param("id");
  const id = rawId.replace(/^:/, "");
  const authorId = JSON.parse(c.get("userId"));
  console.log(id);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const updateBlog = await prisma.post.update({
      where: {
        id: id,
        authorId: authorId,
      },
      data: {
        published: true,
      },
    });
    console.log(updateBlog);
    return c.json({
      id: updateBlog.id,
      msg: "Blog deleted",
    });
  } catch (e) {
    console.log(e);
    c.status(400);
    return c.text("Error while deleting the blog");
  }
});

// Todo: Implement Pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const bulkBlogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
    where: {
      published: false,
    },
  });
  return c.json({
    bulkBlogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const rawId = c.req.param("id");
  const id = rawId.replace(/^:/, "");
  console.log(id);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const getBlogs = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(getBlogs);
    return c.json({
      getBlogs,
    });
  } catch (e) {
    c.status(400);
    return c.text("Cannot get the blogs");
  }
});
