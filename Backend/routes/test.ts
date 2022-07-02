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
    const body = req.body
    const {name, startingTime, totalTime, id } = body
    await Prisma.test.create({
        data: {
            name,
            startingTime: String(startingTime),
            totalTime: Number(totalTime),
            id : Number(id)
        }
    })
})

Test.delete('/test/:id', async (
    req: Request,
    res: Response
) => {
    const { id } = req.params
    await Prisma.test.delete({
        where: {
            id: Number(id)
        }
    })
    res.json('Test has been Deleted Sucessfully!') 
})