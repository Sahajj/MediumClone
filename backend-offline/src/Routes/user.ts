import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { singinInput, singupInput } from "@sahajj9/medium-common";
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = singupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Wrong Inputs"
        })
    } else {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        // zod and password 
        try {
            const user = await prisma.user.create({
                data: {
                    username: body.username,
                    password: body.password,
                    name: body.name
                }
            })
            const jwt = await sign({
                id: user.id
            }, c.env.JWT_SECRET);
            return c.text(jwt)
        } catch (e) {
            c.status(411);
            return c.text("Invalid")
        }
    }

})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = singinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Wrong Inputs"
        })
    } else {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        try {
            const user = await prisma.user.findFirst({
                where: {
                    username: body.username,
                    password: body.password,
                }
            })
            if (!user) {
                c.status(403); //unauthorized
                return c.json({
                    message: "Incorrect Credentials"
                })
            }
            const jwt = await sign({
                id: user.id
            }, c.env.JWT_SECRET);
            return c.text(jwt)
        } catch (e) {
            c.status(411);
            return c.text("Invalid")
        }
    }

})

userRouter.get("/check", async (c) => {

    const authHeader = c.req.header("Authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if (user) {
            return c.json({
                message: "A Valid User"
            })
        } else {
            return c.json({
                message: "Not Valid User"
            })
        }
    } catch (e) {
        return c.json({
            Error: e
        })
    }
})