import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const deleteTodo = async (req: Request, res: Response) => {
    
    const todoId  = req.params.id
    console.log(req.params)

    if (!todoId) {
        return res.status(400).json({ error: 'todoId is required' })
    }

    const deletedTodo = await prisma.todo.delete({
        where: {
            id: Number(todoId)
        }
    })

    res.json(deletedTodo)
}