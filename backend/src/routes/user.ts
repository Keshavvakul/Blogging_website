import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@keshavvakul/common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.text("Wrong inputs!");
    }
    // No need to check is user already exists because in schema i have email
    // set to uniqe so it will automatically throw an error so try catch is enough.
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(token);
  } catch (e) {
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.text("wrong inputs");
    }
    if (!body.email || !body.password) {
      c.status(403);
      return c.text("Pass both email and password");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    console.log(user);

    if (!user) {
      c.status(403);
      return c.json({ error: "User doesnot exists" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (e) {
    console.log(e);
    return c.status(403);
  }
});
