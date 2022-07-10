import { FC } from 'react'
import { useEffect, useState, useId } from 'react'
import { AppContext, useContext } from '../../utils/AppContext'
import URL from '../../utils/URL'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Test : FC = () => {
    const params = useParams()
    const navigate = useNavigate()
    const context = useContext(AppContext)
    const [questions, setQuestions] = useState<object[]>()
    const [testName, setTestName] = useState<string>()
    const [testId, setTestId] = useState<number>()
    const [marks, setMarks] = useState<number>()
    const [sure, setSure] = useState<boolean>(false)
    const [finished, setFinished] = useState<boolean>(false)
    const [results, setResults] = useState<object[]>()
    useEffect(() => {
        if (!context.student.isLoggedIn) {
            navigate('/Login')
        }
        async () => {
            const results = await axios.get(`${URL}/results/${context.student.id}`)
            setResults(results.data)
            console.log(results.data)
        }
    },[])

    async function fetchQns() {
            const res = await axios.get(`${URL}/questions/${params.id}`)
            setQuestions(res.data.questions)
            setTestName(res.data.name)
            setTestId(res.data.id)
        }
    useEffect(() => {
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
        await axios.post(`${URL}/result/create`,{
                studentId: context.student.id,
                testId,
                testName: testName,
                scoredMark: marks
            })
        setSure(false)
        setFinished(true)
      }
      function done() {
        navigate('/')
      }
    return(
<div className="pt-28 flex flex-col items-center">
    <h1 className='text-4xl font-bold text-gray-800'>{testName}</h1>
    <p className="font-medium text-gray-400">Each question carries 1 mark</p>
    {questions.map((question:any, index)=>(
        <Question key={question.id} index={index+1} setMarks={setMarks} marks={marks} question={question} />
    ))}
    <div className="flex h-24 items-center">
        <p className='flex font-bold'>Finished writing your Test? 
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        </p>
        <button onClick={() => setSure(true)} className='ml-3 hover:bg-gray-200 font-medium h-12 w-28 rounded-md bg-gray-800 transition-all hover:outline outline-1 outline-black hover:text-black text-white'>SUBMIT</button>
    </div>
    <div style={sure?{}:{display:'none'}} className="items-center absolute z-30 top-0 bg-[#000000AA] flex-col justify-center flex h-screen w-screen">
        <div className="items-center flex-col justify-center flex bg-white outline outline-1 outline-gray-400 shadow-2xl rounded-md h-48 min-w-[calc(100%-3rem)] max-w-96 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <p className='font-bold mb-5 text-xl text-black'>Do you wanna submit?</p>
            <div className="flex">
                <button onClick={submitResult} className="h-10 mr-3 bg-black hover:bg-gray-800 transition-all w-28 text-white font-bold rounded-md">Yes</button>
                <button onClick={() => setSure(false)} className="h-10 ml-3 bg-black hover:bg-gray-800 transition-all w-28 text-white font-bold rounded-md">Nope</button>
            </div>
        </div>
    </div>
    <div style={finished?{}:{display:'none'}} className='z-30 items-center absolute top-0 bg-[#000000AA] flex-col justify-center flex h-screen w-screen'>
        <div className="items-center flex-col justify-center flex bg-white outline outline-1 outline-gray-400 shadow-2xl rounded-md h-48 max-w-96 min-w-[calc(100%-3rem)] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <p className='font-bold text-xl text-gray-500'>Congrats!</p>
            <p className='font-light text-xl mb-8 text-gray-500'>You have scored {marks} {marks==1||marks==0?"mark":"marks"}!</p>
            <button onClick={done} className="h-10 bg-black hover:bg-gray-800 transition-all w-32 text-white font-bold rounded-md">Done</button>
        </div>
    </div>
</div>
)}
interface QuestionProps {
    setMarks: any
    marks: number
    index: number
    question: {
        answer: string
        optionA: string
        optionB: string
        optionC: string
        optionD: string
        question: string
    }
} 
const Question: FC<QuestionProps> = ({setMarks, marks, question, index}) => {
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
<div className="transition-all hover:shadow-2xl  hover:-translate-y-2 hover:-translate-x-2 select-none outline-1 outline outline-blue-300 m-8 p-6 flex-col items-start md:items-center justify-center flex md:w-[calc(100vw-10rem)] w-[calc(100vw-4rem)] rounded-lg shadow-xl">
    <h1 className='text-lg text-gray-600 font-bold mb-3'>{`${index}. ${question.question}`}</h1>
    <form className='flex flex-col md:flex-row' onSubmit={(e)=>{e.preventDefault()}}>
        <label className='font-medium mb-1 cursor-pointer text-gray-500'>
            <input onChange={e=>setCurrAns(prevAns => e.target.value)} value={question.optionA} className='scale-125 border-white border text-pi m-1 ml-5' type='radio' name={id} />
            {question.optionA}
        </label>
        <label className='font-medium mb-1 cursor-pointer text-gray-500'>
            <input onChange={e=>setCurrAns(prevAns => e.target.value)} value={question.optionB} className='scale-125 border-white border text-pi m-1 ml-5' type='radio' name={id}/>
            {question.optionB}
        </label>
        <label className='font-medium mb-1 cursor-pointer text-gray-500'>
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