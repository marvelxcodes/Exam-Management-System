import cors from 'cors'
import express, { Request, Response } from 'express'
// Route imports
import { Student } from './routes/student'
import { Question } from './routes/question'
import { Result } from './routes/result'
import { Test } from './routes/test'

const App = express()
const port = process.env.PORT || 4000

App.use(
  cors({
    origin:'*',
    credentials: true,
    methods: ["POST", "GET", "DELETE"]
  })
)

App.use(express.urlencoded({extended: true}))
App.use(express.json())
App.use(Student)
App.use(Question)
App.use(Result)
App.use(Test)

App.get('/', (
    req: Request,
    res: Response
) => {
  res.send('<h1>The sever is running properly...</h1>')
})

App.listen(port, () => {
    console.log(`Backend API listening on port : ${port}!`)
})