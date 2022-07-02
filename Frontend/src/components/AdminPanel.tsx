import { FC, useEffect, useState } from "react"
import URL from "../utils/URL"
import "bootstrap-icons/font/bootstrap-icons.css"

interface Props {
    isSignedIn: boolean;
}

interface StudentProps {
    id: number;
    name: string;
    class: number;
}

const AdminPanel : FC<Props> = ({isSignedIn}) => {
    const [adminId, setAdminId] = useState<number>()
    const [name, setName] = useState('')
    const [Class, setClass] = useState<number>()
    const [password, setPassword] = useState('')
    const [students, setStudents] = useState([])
    const [time, setTime] = useState(0)
    const [tTime, setTTime] = useState(0)
    const [testId, setTestId] = useState(0)

    useEffect(() => {
        fetchStudents()
    },[])

    const fetchStudents = async () => {
        const res = await fetch(`${URL}/students`)
        const data = await res.json()
        setStudents(data)
    }

    async function deleteStudent(studentId:number) {
        await fetch(`${URL}/student/${studentId}`, {
            method: 'DELETE'
        })
        console.log('data')
        fetchStudents()
    }

    async function createTest() {
        await fetch(`${URL}/test`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                startingTime: time,
                totalTime: tTime,
                id : Math.floor(Math.random())
            })
        })
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
  return (
    <div style={!isSignedIn?{display:'none'}:{}} className='flex  pt-10 min-h-full'>
        <div className='flex flex-col items-center w-1/2 min-h-full m-5 mr-2.5 bg-gray-200 rounded-lg'>
            <h1 className="m-5 font-bold text-2xl">Post a Test</h1>
            <input placeholder="Name" className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" type="text" />
            <div className="flex w-[calc(100%-5rem)]">
                <p className="bg-white font-bold w-1/2 mr-3 p-3 rounded-md">From: <input className="text-gray-800 text-md font-semibold" onChange={E=>setTime(Number(E.target.value))} type="datetime-local" /></p>
                <p className="bg-white font-bold p-3 w-1/2 ml-3 rounded-md">To: <input className="text-gray-800 text-md font-semibold" onChange={E=>setTime(Number(E.target.value))} type="datetime-local" /></p>
            </div>
            <button onClick={createTest} className="h-10 mt-3 mb-8 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
        </div>
        <div className="flex items-center flex-col w-1/2 min-h-full ml-2.5 bg-gray-200 m-5 rounded-lg">
            <h1 className="m-5 font-bold text-2xl">Register Student</h1>
            <input value={name} onChange={E=>setName(E.target.value)} className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" placeholder="Name" type="text" />
            <div className="flex w-[calc(100%-5rem)]">
                <input value={adminId} onChange={E=>setAdminId(Number(E.target.value))} className=" mb-3 w-1/2 h-10 rounded-md p-5 text-gray-400" placeholder="Admission Number" type="number"  />
                <input value={Class} onChange={E=>setClass(Number(E.target.value))} className=" mb-3 w-1/2 ml-3 h-10 rounded-md p-5 text-gray-400" placeholder="Class" type="number" />
            </div>
            <input value={password} onChange={E=>setPassword(E.target.value)} className="mx-5 mb-3 w-[calc(100%-5rem)] h-10 rounded-md p-5 text-gray-400" placeholder="Password" type="password" />
            <button onClick={createStudent} className="h-10 mb-8 bg-black w-[calc(100%-5rem)] rounded-md text-white hover:bg-gray-800 transition-all text-lg font-bold">Create</button>
            <div className="flex items-center w-[calc(100%-5rem)] flex-col">
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