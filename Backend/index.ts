import express from 'express'
import { Request, Response } from 'express'
// Route imports
import { Student } from './routes/student'
import { Question } from './routes/question'
import { Result } from './routes/result'
import { Test } from './routes/test'

const App = express()
const port = 4000

App.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
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