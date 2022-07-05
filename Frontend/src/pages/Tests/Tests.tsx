import { FC } from 'react'
import { useEffect, useId, useState } from 'react'
import URL from '../../utils/URL'
import { AppContext, useContext } from '../../utils/AppContext'
import { useNavigate } from 'react-router-dom'

const Tests : FC = () => {
    const useid = useId()
    const [ tests, setTests ] = useState([])
    const navigate = useNavigate()
    const context = useContext(AppContext)
    useEffect(() => {
        if (!context.student.isLoggedIn) {
        navigate('/Login')
        }
    },[])
    useEffect(() => {
        async function fetchTests() {
            const res = await fetch(`${URL}/tests`)
            const data = await res.json()
            setTests(data)
        }
        fetchTests()
    },[])
    return(
<div className="flex pt-24 flex-col items-center justify-center">
    <h1 className='text-4xl font-extrabold text-gray-500 my-4'>TESTS</h1>
    <div className='flex flex-col md:flex-row flex-wrap items-center justify-center'>
        {tests?.map((test)=> (
            <Test key={useid} test={test} />
        ))}
    </div>
</div>
)}
export default Tests

function Test({test}:any) {
    const navigate = useNavigate()
    const date = new Date()
    return(
<div key={test.id} className="m-5 pt-8 outline relative flex-col flex items-center justify-start hover:shadow-2xl outline-gray-300 transition-all hover:-translate-x-2 hover:-translate-y-2 outline-1 h-80 rounded-lg w-60 shadow-lg">
    <h1 className='text-2xl text-gray-500 font-bold'>CS Test 1</h1>
    <p className='text-sm text-gray-500'>18th June 2022</p>
    <div className="flex flex-col items-center justify-center absolute bottom-20">
        <p className='text-sm text-gray-500'>Subject</p>
        <hr className='bg-gray-500 w-28 h-[0.5px] m-1' />
        <p className='text-sm text-gray-500'>{test.subject}</p>
    </div>
    <button onClick={()=>{navigate(`/Test/${test.id}`)}} className="h-10 hover:bg-gray-600 font-medium w-[calc(100%-1rem)] transition-all absolute bottom-2 rounded bg-gray-500 text-white ">
        {test.startingTime+test.totalTime<Date.now()?'TEST ENDED':'ATTEND'}
    </button>
</div>
)}