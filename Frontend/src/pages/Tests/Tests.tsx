import { FC } from 'react'
import { useEffect, useId, useState } from 'react'
import URL from '../../utils/URL'
import { AppContext, useContext } from '../../utils/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Tests : FC = () => {
    const [resultIds, setResultIds] = useState<number[]>()
    const [tests, setTests ] = useState([])
    const navigate = useNavigate()
    const context = useContext(AppContext)
    useEffect(() => {
        if (!context.student.isLoggedIn) {
            navigate('/Login')
        } else {
            fetchResults()
            fetchTests()
        }
    },[])
    async function fetchResults() {
        const res = await axios.get(`${URL}/results/${context.student.id}`)
        function data() {
            const Ids = res.data.map((result:any) => (
                Number(result.testId)
            ))
            return Ids
        }
        setResultIds(data())
    }
    async function fetchTests() {
        const res = await axios.get(`${URL}/tests`)
        setTests(res.data)
    }
    return(
<div className="flex pt-24 flex-col items-center justify-center">
    <h1 className='text-4xl font-extrabold text-gray-500 my-4'>TESTS</h1>
    <div className='flex flex-col md:flex-row flex-wrap items-center justify-center'>
        {tests?.map((test:any)=> {
            const id = Number(test.id)
            const finished = (resultIds?.includes(id))?true:false
        return(
            <Test finished={finished} key={test.id} test={test} />
        )})}
    </div>
</div>
)}
export default Tests

interface TestProps {
    finished: boolean
    test: {
        id: number
        name: string
        subject: string
        date: string
    }
}

const Test: FC<TestProps> = ({test, finished}) => {
    const navigate = useNavigate()
    const day = (date:string) => {
        const number = new Date(date).getDay()+1
        if(number==1) return "Sunday"
        else if(number==2) return 'Monday'
        else if(number==3) return 'Tuesday'
        else if(number==4) return 'Wednesday'
        else if(number==5) return 'Thursday'
        else if(number==6) return 'Friday'
        else if(number==7) return 'Saturday'
    }
    return(
<div key={test.id} className="m-5 pt-12 outline relative flex-col flex items-center justify-start hover:shadow-2xl outline-gray-300 transition-all hover:-translate-x-2 hover:-translate-y-2 outline-1 h-80 rounded-lg w-60 shadow-lg">
    <h1 className='text-2xl text-gray-500 font-bold'>{test.name}</h1>
    <p className='text-sm text-gray-500'>{test.subject}</p>
    <div className="flex flex-col items-center justify-center absolute bottom-20">
        <p className='text-sm text-gray-500'>{day(test.date)}</p>
        <hr className='bg-gray-500 w-28 h-[0.5px] m-1' />
        <p className='text-sm text-gray-500'>{new Date(test.date).toUTCString().slice(4, 16)}</p>
    </div>
    <button disabled={finished?true:new Date(test.date).toDateString()!=new Date().toDateString()?true:false} onClick={()=>{navigate(`/Test/${test.id}`)}} className="h-10 hover:bg-gray-600 font-medium w-[calc(100%-1rem)] transition-all absolute bottom-2 rounded bg-gray-500 text-white ">
        {finished?"Finished":(new Date(test.date).toDateString()==new Date().toDateString())?'Attend':Date.parse(test.date)>Date.parse(Date())?"Not Started Yet":'Exam Over'}
    </button>
</div>
)}