import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateTodo = async (req: Request, res: Response) => {
    const todoId = req.params.id;
    const { title, description } = req.body;

    if (!todoId) {
        return res.status(400).json({ error: 'Todo ID is required' });
    }

    const updatedTodo = await prisma.todo.update({
        where: {
            id: Number(todoId),
        },
        data: {
            title,
            description,
        },
    });

    res.json(updatedTodo);
};