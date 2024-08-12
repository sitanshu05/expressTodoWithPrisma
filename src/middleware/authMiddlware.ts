import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const prisma = new PrismaClient();


    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const authorizationHeader = req.headers.authorization?.split(' ')[0] === 'Bearer' ? req.headers.authorization : undefined;

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', async (err: any, decoded: any) => {
        if (err) {
            console.error(err);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.userId = user.id;
        next();
    });
};