import { FC } from 'react'
import { useEffect, useState, useId } from 'react'
import { AppContext, useContext } from '../../utils/AppContext'
import URL from '../../utils/URL'
import { useNavigate, useParams } from 'react-router-dom'

const Test : FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const context = useContext(AppContext)
    const [questions, setQuestions] = useState([])
    const [testName, setTestName] = useState('')
    const [testId, setTestId] = useState(0)
    const [marks, setMarks] = useState(0)
    const [finished, setFinished] = useState(false)
    useEffect(() => {
        if (!context.student.isLoggedIn) {
        navigate('/Login')
        }
    },[])
    useEffect(() => {
        async function fetchQns() {
            const response = await fetch(`${URL}/questions/${params.id}`)
            const data = await response.json()
            setQuestions(data.questions)
            setTestName(data.name)
            setTestId(data.id)
        }
        fetchQns()
        const unloadCallback = (event:any) => {
          event.preventDefault()
          event.returnValue = ""
          return ""
        }
        window.addEventListener("beforeunload", unloadCallback)
        return () => window.removeEventListener("beforeunload", unloadCallback)
      }, [])
      async function submitResult() {
        await fetch(`${URL}/result/create`,{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: context.student.id,
                testId,
                testName: testName,
                scoredMark: marks
            })
        })
        setFinished(true)
      }
      function done() {
        navigate('/')
      }
    return(
<div className="pt-28 flex flex-col items-center">
    <h1 className='drop-shadow-sm text-4xl font-bold text-gray-400'>{testName}</h1>
    <p className="font-light">Each question carries 1 mark</p>
    {
        questions.map((question:any)=>(
            <Question key={question.id} setMarks={setMarks} marks={marks} question={question} />
        ))
    }
    <div className="flex h-24 items-center">
        <p className='flex font-bold'>Finished writing your Test? 
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        </p>
        <button onClick={submitResult} className='ml-3 hover:bg-gray-200 font-medium h-12 w-28 rounded-md bg-gray-800 transition-all hover:outline outline-1 outline-black hover:text-black text-white'>SUBMIT</button>
    </div>
    <div style={finished?{}:{display:'none'}} className='items-center absolute top-0 bg-[#000000AA] flex-col justify-center flex h-screen w-screen'>
        <div className="items-center flex-col justify-center flex bg-white outline outline-1 outline-gray-400 shadow-2xl rounded-md h-48 w-96 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <p className='font-bold text-xl text-gray-500'>Congrats!</p>
            <p className='font-light text-xl mb-8 text-gray-500'>You have scored {marks} marks!</p>
            <button onClick={done} className="h-10 bg-black hover:bg-gray-800 transition-all w-32 text-white font-bold rounded-md">Done</button>
        </div>
    </div>
    
</div>
)}

function Question({setMarks, marks, question}:any) {
    const [tempMarks, setTempMarks] = useState(false)
    const [currAns, setCurrAns] = useState('')
    const id = useId()
    useEffect(() => {
        if(currAns==question.answer&&!tempMarks){
            setMarks(marks+1)
            setTempMarks(true)
        }else if (currAns!==question.answer&&tempMarks) {
            setMarks(marks-1)
            setTempMarks(false)
        }
    },[currAns])
    return(
<div className="transition-all flex-wrap hover:shadow-2xl hover:-translate-y-2 hover:-translate-x-2 select-none outline-1 outline outline-blue-300 m-8 h-28 flex-col items-center justify-center flex w-[calc(100vw-10rem)] rounded-lg shadow-xl">
    <h1 className='text-lg text-gray-600 font-bold mb-3'>{`${question.id}. ${question.question}`}</h1>
    <form onSubmit={(e)=>{e.preventDefault()}}>
        <label className='font-medium cursor-pointer text-gray-500'>
            <input onChange={e=>setCurrAns(prevAns => e.target.value)} value={question.optionA} className='scale-125 border-white border text-pi m-1 ml-5' type='radio' name={id} />
            {question.optionA}
        </label>
        <label className='font-medium cursor-pointer text-gray-500'>
            <input onChange={e=>setCurrAns(prevAns => e.target.value)} value={question.optionB} className='scale-125 border-white border text-pi m-1 ml-5' type='radio' name={id}/>
            {question.optionB}
        </label>
        <label className='font-medium cursor-pointer text-gray-500'>
            <input onChange={e=>setCurrAns(prevAns => e.target.value)} value={question.optionC} className='scale-125 border-white border text-pi m-1 ml-5' type='radio' name={id}/>
            {question.optionC}
        </label>
        <label className='font-medium cursor-pointer text-gray-500'>
            <input onChange={e=>setCurrAns(prevAns => e.target.value)} value={question.optionD} className='scale-125 border-white border text-pi m-1 ml-5' type='radio' name={id}/>
            {question.optionD}
        </label>
    </form>
</div>
)}

export default Test