import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { UserSchema } from '../../schema/user.schema'

const prisma = new PrismaClient()
export const signup = async (req: Request, res: Response) => {

    const { error } = UserSchema.safeParse({
        username: req.body.username,
        password: req.body.password
    })

    if (error) {
        return res.status(400).json({ error: error.message })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const user = await prisma.user.create({
        data: {
            username:req.body.username,
            password: hashedPassword
        }
    })

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