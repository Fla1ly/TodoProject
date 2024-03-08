import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


// POST /api/addTodo
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { title, description } = req.body
    const result = await prisma.todo.create({
        data: {
            title: title,
            description: description,
        }
    })
    return res.status(201).json(result)
}