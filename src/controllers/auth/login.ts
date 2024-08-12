import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { UserSchema } from '../../schema/user.schema'

const prisma = new PrismaClient()

export const logIn = async (req: Request, res: Response) => { 

    const { error } = UserSchema.safeParse({
        username: req.body.username,
        password: req.body.password
    })

    if (error) {
        return res.status(400).json({ error: error.message })
    }

    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (!user) {
        return res.status(400).json({ error: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '10h' }
    )

    res.json({ token, userId: user.id })
}
