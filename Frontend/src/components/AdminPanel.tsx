import { FC, useEffect, useState } from "react"
import URL from "../utils/URL"

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
    startingTime: number
    totalTime: number
    id : number
}

const AdminPanel : FC<Props> = ({isSignedIn}) => {
    const [adminId, setAdminId] = useState<number>()
    const [name, setName] = useState<string>()
    const [Class, setClass] = useState<number>()
    const [password, setPassword] = useState<string>()

    const [students, setStudents] = useState([])

    const [time, setTime] = useState<any>()
    const [tTime, setTTime] = useState<any>()
    const [testName, setTestName] = useState<string>()
    const [testId, setTestId] = useState<number>()
    
    const [questions, setQuestions] = useState([])
    const [tests, setTests] = useState([])

    const [question, setQuestion] = useState<string>()
    const [answer, setAnswer] = useState<string>()
    const [optionA, setOptionA] = useState<string>()
    const [optionB, setOptionB] = useState<string>()
    const [optionC, setOptionC] = useState<string>()
    const [optionD, setOptionD] = useState<string>()
    const [ansSelection, setAnsSelection] = useState<number>()

    useEffect(() => {
        fetchStudents()
        fetchTests()
    },[])

    const fetchTests = async () => {
        const res = await fetch(`${URL}/tests`)
        setTests(await res.json())
    }

    const fetchStudents = async () => {
        const res = await fetch(`${URL}/students`)
        const data = await res.json()
        setStudents(data)
    }

    async function createStudent() {
        if (adminId&&name&&Class&&password) {
            await fetch(`${URL}/student`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: adminId,
                    name,
                    Class: Class,
                    password
                })
            })
            fetchStudents()
            setAdminId(Number())
            setName('')
            setPassword('')
            setClass(Number())
        } else {
            alert('Please enter all the required Details!')
        }
    }

    async function deleteStudent(studentId:number) {
        await fetch(`${URL}/student/${studentId}`, {
            method: 'DELETE'
        })
        await fetchStudents()
    }

    async function createTest() {
        if(testName&&time&&tTime) {
            setTestId(Math.floor(Math.random()))
            await fetch(`${URL}/test`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    startingTime: time,
                    totalTime: tTime,
                    id : testId
                })
            })
        } else {
            alert(`Please enter all the required details!`)
        }
    }

    async function deleteTest(testId:number) {
        fetch(`${URL}/test/${testId}`, {
            method: 'DELETE'
        })
    }

    async function createQuestion() {
        await fetch(`${URL}/question`, {
            body: JSON.stringify({
                answer,
                optionA,
                optionB,
                optionC,
                optionD,
                question,
                testId,
            })
        })
    }

    async function deleteQuestion() {

    }
  return (
<div style={!isSignedIn?{display:'none'}:{}} className='flex  pt-10 min-h-full'>
    <div className='flex flex-col items-center w-1/2 min-h-full m-5 mr-2.5 bg-gray-200 rounded-lg'>
        <h1 className="m-5 font-bold text-2xl">Post a Test</h1>
        <input value={testName} onChange={E=>setTestName(E.target.value)} placeholder="Name" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
        <div className="flex w-[calc(100%-5rem)]">
            <label className="bg-white font-bold w-1/2 mr-3 p-3 flex justify-center rounded-md">From: <input className="text-gray-800 text-md text-center font-semibold" value={time} onChange={E=>setTime(E.target.value)} type="datetime-local" /></label>
            <label className="bg-white font-bold p-3 w-1/2 ml-3 flex justify-center rounded-md ">To:  <input className="text-gray-800 text-md text-center font-semibold" value={tTime} onChange={E=>setTTime(E.target.value)} type="datetime-local"  /></label>
        </div>
        <button onClick={createTest} className="h-10 mt-3 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
        <hr className="h-[1px] w-[calc(100%-5rem)] bg-gray-400 m-8" />
        <div style={testId?{display:'none'}:{}} className="w-[calc(100%-5rem)] pb-5 flex items-center flex-col">
            <h1 className="mb-5 font-bold text-2xl">Tests</h1>
            {tests?.map((test:TestProps) => (
                <div className="h-10 my-3 bg-white rounded-md justify-evenly items-center w-full flex" key={test.id}>
                    <h1 className="mx-5 font-semibold text-left w-1/3"></h1>
                    <h1 className="mx-5 font-semibold text-left w-1/3">{test.name}</h1>
                    <button className="w-1/3 text-right relative right-5" onClick={() => deleteTest(test.id)}>
                        <i className="bi bi-trash3 hover:text-red-500"></i>
                    </button>
                </div>
            ))}
        </div>
        <div style={!testId?{display:'none'}:{}} className="w-full pb-5 flex items-center flex-col">
            <h1 className="m-5 font-bold text-2xl">Post a Question</h1>
            <form onSubmit={E=>E.preventDefault()} className="flex w-full items-center flex-col">
                <input value={question} onChange={E=>setQuestion(E.target.value)} placeholder="Question" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input value={optionA} onChange={E=>setOptionA(E.target.value)} placeholder="Option A" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input value={optionB} onChange={E=>setOptionB(E.target.value)} placeholder="Option B" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input value={optionC} onChange={E=>setOptionC(E.target.value)} placeholder="Option C" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <input value={optionD} onChange={E=>setOptionD(E.target.value)} placeholder="Option D" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
                <div className="flex m-3">
                    <button className={`rounded-full ${ansSelection==1?'bg-pink-500':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={E =>{setAnswer(E.currentTarget.title);setAnsSelection(1)}} title={optionA}>A</button>
                    <button className={`rounded-full ${ansSelection==2?'bg-pink-500':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={E =>{setAnswer(E.currentTarget.title);setAnsSelection(2)}} title={optionB}>B</button>
                    <button className={`rounded-full ${ansSelection==3?'bg-pink-500':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={E =>{setAnswer(E.currentTarget.title);setAnsSelection(3)}} title={optionC}>C</button>
                    <button className={`rounded-full ${ansSelection==4?'bg-pink-500':'bg-gray-400'} h-8 w-8 text-white font-bold mr-5`} onClick={E =>{setAnswer(E.currentTarget.title);setAnsSelection(4)}} title={optionD}>D</button>
                </div>
                <button onClick={createQuestion} className="h-10 mt-3 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
            </form>
        </div>
        <div style={!testId?{display:'none'}:{}} className="flex w-full flex-col items-center">
            <hr className="h-[1px] w-[calc(100%-5rem)] bg-gray-400 m-8" />
            <h1 className="m-5 font-bold text-2xl">Questions</h1>
        </div>
    </div>
    <div className="flex items-center flex-col w-1/2 min-h-full ml-2.5 bg-gray-200 m-5 rounded-lg">
        <form className="flex items-center flex-col w-full" onSubmit={(e)=>e.preventDefault()}>
            <h1 className="m-5 font-bold text-2xl">Register Student</h1>
            <input value={name} onChange={E=>setName(E.target.value)} className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" placeholder="Name" type="text" />
            <div className="flex w-[calc(100%-5rem)]">
                <input value={adminId} onChange={E=>setAdminId(Number(E.target.value))} className=" mb-3 w-1/2 h-10 rounded-md p-5 text-gray-400" placeholder="Admission Number" type="number"  />
                <input value={Class} onChange={E=>setClass(Number(E.target.value))} className=" mb-3 w-1/2 ml-3 h-10 rounded-md p-5 text-gray-400" placeholder="Class" type="number" />
            </div>
            <input value={password} onChange={E=>setPassword(E.target.value)} className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" placeholder="Password" type="password" />
            <button onClick={createStudent} className="h-10 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
        </form>
        <hr className="h-[1px] w-[calc(100%-5rem)] bg-gray-400 m-8" />
        <div className="flex items-center w-[calc(100%-5rem)] pb-5 flex-col">
            <h1 className="font-bold text-2xl">Students</h1>
            {students.map((student: StudentProps) => (
                <div className="h-10 my-3 bg-white rounded-md justify-evenly items-center w-full flex" key={student.id}>
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