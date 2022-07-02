import { Router } from "express"
import Prisma from '../prisma/Prisma'
import type { Request, Response } from 'express'

export const Question = Router()

Question.get('/questions/:id', async (
    req: Request,
    res: Response
) => {
    const { id } = req.params
    const test = await Prisma.test.findUnique({
        where: {
            id : Number(id)
        }
    })
    const questions = await Prisma.question.findMany({
        where: {
            testId : Number(test?.id)
        }
    })
    res.json({
        name: test?.name,
        id: test?.id,
        questions
    })
})

Question.post('/questions', async (
    req: Request,
    res: Response
) => {
    const { answer, optionA, optionB, optionC, optionD, question, testId } = req.body
    await Prisma.question.create({
        data: {
            answer,
            optionA,
            optionB,
            optionC,
            optionD,
            question,
            testId: Number(testId),
            id: Math.floor(Math.random()*100000)
        }
    })
})

Question.delete('/question/:id', async (
    req: Request,
    res: Response
) => {
    const { id } = req.params
    await Prisma.question.delete({
        where: {
            id: Number(id)
        }
    })
    res.json("The question has been deleted sucessfully!")
})