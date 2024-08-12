import { z } from 'zod'

export const TodoSchema = z.object({
    id: z.number().int().refine((val) => Number.isInteger(val), {
        message: 'Id must be an integer'
    }),
    title: z.string().min(1, { message: 'Title must not be empty' }),
    description: z.string(),
    userId: z.number().int().refine((val) => Number.isInteger(val), {
        message: 'userId must be an integer'
    })
})
