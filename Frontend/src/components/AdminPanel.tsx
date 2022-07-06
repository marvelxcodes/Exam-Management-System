import { FC, useEffect, useRef, useState } from "react"
import URL from "../utils/URL"
import axios from "axios"

interface Props {
    isSignedIn: boolean;
}
interface StudentProps {
    id: number;
    name: string;
    class: number;
}
interface TestProps {
    name: string
    date: string
    subject: string
    id : number
}
interface QuestionProps {
    id: number
    answer: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    question: string
    testId: number
}

const AdminPanel : FC<Props> = ({isSignedIn}) => {
    const testid = () => { return Math.floor(Math.random()*10000)}
    const adminId = useRef<any>()
    const name = useRef<any>()
    const Class = useRef<any>()
    const password = useRef<any>()

    const [students, setStudents] = useState([])

    const date = useRef<any>()
    const subject = useRef<any>()
    const testName = useRef<any>()
    const [testId, setTestId] = useState<number>()
    
    const [questions, setQuestions] = useState([])
    const [tests, setTests] = useState([])

    const question = useRef<any>()
    const optionA = useRef<any>()
    const optionB = useRef<any>()
    const optionC = useRef<any>()
    const optionD = useRef<any>()
    const [answer, setAnswer] = useState<string>()
    const [ansSelection, setAnsSelection] = useState<number>()
    const [delQues, setDelQues] = useState<boolean>()

    useEffect(() => { if(testId) { fetchQuestions() }},[testId])

    useEffect(() => {
        fetchStudents()
        fetchTests()
    },[])
    const fetchTests = async () => {
        const res = await axios.get(`${URL}/tests`)
        setTests(res.data)
    }

    const fetchStudents = async () => {
        const res = await axios.get(`${URL}/students`)
        setStudents(res.data)
    }

    const fetchQuestions = async () => {
        const res = await axios.get(`${URL}/question/${testId}`)
        setQuestions(res.data)
    }

    async function createStudent() {
        if (adminId.current.value&&name.current.value&&Class.current.value&&password.current.value) {
            await axios.post(`${URL}/student`, {
                id: adminId.current.value,
                name: name.current.value,
                Class: Class.current.value,
                password: password.current.value
            })
            fetchStudents()
            adminId.current.value = ''
            password.current.value = ''
            Class.current.value = ''
            name.current.value = ''
        } else {
            alert('Please enter all the required Details!')
        }
    }

    async function deleteStudent(studentId:number) {
        await fetch(`${URL}/student/${studentId}`, {
            method: 'DELETE',
        })
        fetchStudents()
    }
    
    async function createTest() {
        const id = testid()
        if(testName.current.value&&date.current.value&&subject.current.value) {
            await axios.post(`${URL}/test`,{
                name: testName.current.value,
                date: date.current.value,
                subject: subject.current.value,
                id
            })
            setTestId(id)
            fetchTests()
        } else {
            alert(`Please enter all the required details!`)
        }
    }

    async function deleteTest(id:number) {
        await axios.delete(`${URL}/test`, {
            data: {id}
        })
        fetchTests()
    }

    async function createQuestion() {
        await axios.post(`${URL}/questions`, {
                answer,
                optionA: optionA.current.value,
                optionB: optionB.current.value,
                optionC: optionC.current.value,
                optionD: optionD.current.value,
                question: question.current.value,
                testId,
            })
        question.current.value = ''
        optionA.current.value = ''
        optionB.current.value = ''
        optionC.current.value = ''
        optionD.current.value = ''
        setAnswer('')
        setAnsSelection(0)
        fetchQuestions()
    }

    async function deleteQuestion(id:number) {
        await axios.delete(`${URL}/question/${id}`,{
        })
        fetchQuestions()
    }
  return (
<div style={isSignedIn?{}:{display:'none'}} className='flex-col select-none flex lg:flex-row lg:items-start items-center pt-10 min-h-full'>
    <div className='flex flex-col items-center lg:ml-5 lg:w-1/2 w-[calc(100%-60px)] min-h-full my-5 mr-2.5 bg-gray-200 rounded-lg'>
        <div style={testId?{display:'none'}:{}} className="w-full flex flex-col items-center">
            <h1 className="m-5 font-bold text-2xl">Post a Test</h1>
            <input ref={testName} placeholder="Name" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
            <div className="flex w-[calc(100%-5rem)]">
                <label className="bg-white font-bold w-1/2 mr-3 p-3 flex justify-center rounded-md">Date: <input className="text-gray-500 text-md text-center font-semibold" ref={date} type="date"/></label>
                <label className="bg-white font-bold items-center p-3 w-1/2 ml-3 flex justify-center rounded-md ">Subject: 
                    <select ref={subject} className="ml-1 text-gray-500 bg-white">
                        <option value="Computer Science">Computer Science</option>
                        <option value="English">English</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Physics">Physics</option>
                        <option value="Tamil">Tamil</option>
                    </select>
                </label>
            </div>
            <button onClick={createTest} className="h-10 mt-3 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
            <hr className="h-[1px] w-[calc(100%-5rem)] bg-gray-400 m-8" />
        </div>
        <div style={testId?{display:'none'}:{}} className="w-[calc(100%-5rem)] pb-5 flex items-center flex-col">
            <h1 className="mb-5 font-bold text-2xl">Tests</h1>
            {tests?.map((test:TestProps) => (
                <div className="h-10 my-3 bg-white outline outline-1 outline-gray-400 rounded-md relative justify-evenly items-center w-full flex" key={test.id}>
                    <h1 className="mx-5 font-semibold text-left w-1/3">{test.name}</h1>
                    <h1 className="mx-5 text-left w-1/3">{test.subject}</h1>
                    <h1 className="mx-5 text-left w-1/3">{test.date}</h1>
                    <button className="w-6 text-right absolute flex justify-center right-12" onClick={()=>setTestId(test.id)}>
                        <i className="bi bi-pencil-fill transition-all hover:text-yellow-600"></i>
                    </button> 
                    <button className="w-6 text-right absolute right-5" onClick={() => deleteTest(test.id)}>
                        <i className="bi bi-trash3 transition-all hover:text-red-500"></i>
                    </button>
                </div>
            ))}
        </div>
        <div style={!testId?{display:'none'}:{}} className="w-full pb-5 flex items-center flex-col">
            <div className="flex items-center h-24 w-full justify-center relative">
                <button onClick={ async() =>{ await setTestId(Number());fetchTests() }} className="h-10 hover:bg-gray-800 transition-all w-10 absolute left-11 rounded-lg bg-black"><i className="bi text-white h-full w-full hover:text-gray-200 bi-chevron-left"></i></button>
                <h1 className="m-5 font-bold text-2xl">Post a Question</h1>
            </div>
            <form onSubmit={E=>E.preventDefault()} className="flex w-full items-center flex-col">
                <input ref={question} placeholder="Question" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input ref={optionA} placeholder="Option A" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input ref={optionB} placeholder="Option B" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input ref={optionC} placeholder="Option C" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input ref={optionD} placeholder="Option D" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <div className="flex m-3">
                    <button className={`rounded-full ${ansSelection==1?'bg-black':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={()=>{setAnswer(optionA.current.value);setAnsSelection(1)}}>A</button>
                    <button className={`rounded-full ${ansSelection==2?'bg-black':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={()=>{setAnswer(optionB.current.value);setAnsSelection(2)}}>B</button>
                    <button className={`rounded-full ${ansSelection==3?'bg-black':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={()=>{setAnswer(optionC.current.value);setAnsSelection(3)}}>C</button>
                    <button className={`rounded-full ${ansSelection==4?'bg-black':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={()=>{setAnswer(optionD.current.value);setAnsSelection(4)}}>D</button>
                </div>
                <button onClick={createQuestion} className="h-10 mt-3 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
            </form>
        </div>
        <div style={!testId?{display:'none'}:{}} className="flex pb-8 w-[calc(100%-5rem)] flex-col items-center">
            <hr className="h-[1px] w-[calc(100%-5rem)] bg-gray-400 m-8" />
            <h1 className="mt-5 font-bold text-2xl">Questions</h1>
            <p className="mb-5 font-medium text-sm text-gray-600">Number of Questions: {questions.length}</p>
            {questions?.map((question:QuestionProps, index) => (
                <div className="h-10 outline relative outline-1 outline-gray-400 my-3 bg-white rounded-md justify-evenly items-center w-full flex" key={question.id}>
                    <h1 className="mx-5 text-left font-semibold w-full">{index+1}. {question.question}</h1>
                    <button className="w-5 text-right absolute right-5" onClick={() => {deleteQuestion(question.id);setDelQues(!delQues?true:!delQues)}}>
                        <i className="bi bi-trash3 hover:text-red-500"></i>
                    </button>
                </div>
            ))}
        </div>
    </div>
    <div className="flex items-center flex-col lg:mr-5 lg:w-1/2 w-[calc(100%-60px)] min-h-full my-5 bg-gray-200 rounded-lg">
        <form className="flex items-center flex-col w-full" onSubmit={(e)=>e.preventDefault()}>
            <h1 className="m-5 font-bold text-2xl">Register Student</h1>
            <input ref={name} className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" placeholder="Name" type="text" />
            <div className="flex w-[calc(100%-5rem)]">
                <input ref={adminId} className=" mb-3 w-1/2 h-10 rounded-md p-5 text-gray-400" placeholder="Admission Number" type="number"  />
                <input ref={Class} className=" mb-3 w-1/2 ml-3 h-10 rounded-md p-5 text-gray-400" placeholder="Class" type="number" />
            </div>
            <input ref={password} className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" placeholder="Password" type="password" />
            <button onClick={createStudent} className="h-10 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
        </form>
        <hr className="h-[1px] w-[calc(100%-5rem)] bg-gray-400 m-8" />
        <div className="flex items-center w-[calc(100%-5rem)] pb-5 flex-col">
            <h1 className="font-bold text-2xl">Students</h1>
            {students.map((student: StudentProps) => (
                <div className="h-10 outline outline-1 outline-gray-400 my-3 bg-white rounded-md justify-evenly items-center w-full flex" key={student.id}>
                    <h1 className="mx-5 text-center w-1/5">{student.id}</h1>
                    <h1 className="mx-5 text-center w-2/5">{student.name}</h1>
                    <h1 className="mx-5 text-center w-1/5">{student.class}</h1>
                    <button className="w-1/5 text-right relative right-5" onClick={() => deleteStudent(student.id)}>
                        <i className="bi bi-trash3 hover:text-red-500"></i>
                    </button>
                </div>
            ))}
        </div>
    </div>
</div>
)}

export default AdminPanel