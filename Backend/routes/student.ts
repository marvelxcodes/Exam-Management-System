import { Router } from "express"
import Prisma from '../prisma/Prisma'
import type { Request, Response } from 'express'

export const Student = Router()

Student.get('/student/:id', async (
    req: Request,
    res: Response
) => {
    const { id } = req.params
    const data = await Prisma.student.findUnique({
        where: {
            id: Number(id)
        }
    })
    if (data) {
        res.json(data)
    } else {
        res.json('error')
    }
})

Student.get('/students', async (
    req: Request,
    res: Response
) => {
    const data = await Prisma.student.findMany()
    res.json(data)
})

Student.post('/student', async (
    req: Request,
    res: Response
) => {
    const { Class, id, password, name } = req.body
    await Prisma.student.create({
        data: {
            name,
            password: password,
            id: Number(id),
            class: Number(Class)
        }
    })
    res.status(200).json({ success: true})
})

Student.delete('/student/:id', async (
    req: Request,
    res: Response
) => {
    const { id } = req.params
    await Prisma.student.deleteMany({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json({ success: true})
})