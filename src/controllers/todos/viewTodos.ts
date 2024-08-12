import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const viewTodos = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId,
    },
  });

  res.json(todos);
};
