import { z } from 'zod'

export const UserSchema = z.object({
    id: z.number().int().refine((val) => Number.isInteger(val), {
        message: 'Id must be an integer'
    }),
    username: z
        .string()
        .min(6, { message: 'Username must be at least 6 characters long' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })

})