import z from "zod";

export const singupInput = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export  const singinInput = z.object({
    username: z.string().email(),
    password: z.string().min(8),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})

export const updateBlogInput = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string()
})


export type SingUpInput = z.infer<typeof singupInput>
export type SingnInInput = z.infer<typeof singinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput> 
export type UpdateBlogInput = z.infer<typeof updateBlogInput> 