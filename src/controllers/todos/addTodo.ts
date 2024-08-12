import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const addTodo = async (req: Request, res: Response) => {

    const { title, description } = req.body
    const userId = req.userId

    if (!title) {
        return res.status(400).json({ error: 'Title is required' })
    }


    if(typeof userId === 'undefined'){
        return res.status(400).json({ error: 'userId is required' })
    }

    const todo = await prisma.todo.create({
        data: {
            title,
            description,
            userId
        }
    })

    res.json(todo)
}