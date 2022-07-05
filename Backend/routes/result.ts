import { Router } from "express"
import Prisma from '../prisma/Prisma'
import type { Request, Response } from 'express'

export const Result = Router()

Result.get('/results/:studentId', async (
    req: Request,
    res: Response
) => {
    const { studentId } = req.params
    const results = await Prisma.result.findMany({
        where: {
            studentId: Number(studentId)
        }
    })
    if(results) {
        res.json(results)
    } else {
        res.json('error')
    }
})

Result.post('/result/create', async (
    req: Request,
    res: Response
) => {
    const { studentId, scoredMark, testId, testName } = req.body
    res.json(
        await Prisma.result.create({
        data: {
            studentId: Number(studentId),
            scoredMark: Number(scoredMark),
            testId: Number(testId),
            testName,
            id: Math.floor(Math.random()*100000)
        }
    }))
    res.status(200).json({ success: true})
})