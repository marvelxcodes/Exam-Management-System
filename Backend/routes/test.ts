import { Router } from "express"
import Prisma from '../prisma/Prisma'
import type { Request, Response } from 'express'

export const Test = Router()

Test.get('/tests', async (
    req: Request,
    res: Response
) => {
    const data = await Prisma.test.findMany()
    res.json(data)
})

Test.post('/test', async (
    req: Request,
    res: Response
) => {
    const {name, date, subject, id } = req.body
    await Prisma.test.create({
        data: {
            name,
            date,
            subject,
            id : Number(id)
        }
    })
    res.status(200).json({ success: true})
})

Test.delete('/test', async (
    req: Request,
    res: Response
) => {
    const id = req.body.id
    await Prisma.test.delete({
        where: { id: Number(id) }
    })
    res.status(200).json({success: true})
})