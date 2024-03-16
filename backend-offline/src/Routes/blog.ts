import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@sahajj9/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    // extract the user id
    // pass it down to the route handler
    const authHeader = c.req.header("Authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(401)
            return c.json({
                message: "You are not logged in"
            })
        }
    }
    catch (e) {
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(422);
        return c.json({
            message: "Wrong Inputs"
        })
    } else {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const authorId = c.get("userId")
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })

        return c.json({
            id: blog.id
        })
    }
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(422);
        return c.json({
            message: "Wrong Inputs Provided"
        })
    } else {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        c.status(200)
        return c.json({
            id: blog.id
        })
    }
})



// add pagination
// only return first 10 blogs and then if the user needs more we can
// do an other request to get more
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    c.status(200)
    return c.json({
        blogs
    })
})


blogRouter.get('/:id', async (c) => {
    const id = Number(c.req.param("id"))
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        c.status(200)
        return c.json({
            blog: blog
        })
    } catch (e) {
        c.status(403);
        return c.json({
            message: "Error while getting the blog post"
        })

    }
})

blogRouter.delete('/:id', async (c) => {
    const Delid = Number(c.req.param("id"))
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.blog.delete({
            where: {
                id: Number(Delid)
            }
        })
        return c.json({
            id: blog.id
        })
    } catch(e) {
        c.status(400)
        return c.json({
            message: "No such Blog Exists"
        })
    } 
})
