import { FC, useId, useRef, useState } from 'react'
import { AppContext, useContext } from '../utils/AppContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import URL from '../utils/URL'

interface ResultProps {
  studentId: number
  scoredMark: number
  testId: number
  testName: string
}

const Home: FC = () => {
  const useid = useId()
  const resultsRef = useRef<any>()
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  const context = useContext(AppContext)

  function scrollToResults() {
    resultsRef.current.scrollIntoView({behavior: 'smooth'})
  }

  const fetchResults = async() => {
    const res = await fetch(`${URL}/results/${context.student.id}`)
    const data = await res.json()
    setResults(data)
  }

  useEffect(() => {
    if (!context.student.isLoggedIn) {
      navigate('/Login')
    }
    fetchResults()
  },[])

  return (
<div>
  <div className='pt-20 h-screen items-center justify-center flex flex-col'>
    <h1 className='font-extrabold text-4xl text-gray-400'>Hello</h1>
    <h1 className='font-extrabold text-center text-6xl text-gray-500 mb-3'>{context.student.name}</h1>
    <p className='font-bold text-2xl'>Class : {context.student.class}</p>
    <hr className='h-[1px] m-8 bg-gray-300 w-96' />
    <div className="flex">
      <Link to='/Tests'>
        <button className='h-12 mr-3 bg-black hover:bg-gray-800 transition-all text-white w-32 text-md rounded-lg font-bold'>Tests</button>
      </Link>
      <button onClick={scrollToResults} className='h-12 ml-3 outline outline-1 outline-gray-800 hover:bg-gray-200 transition-all text-black w-32 text-md rounded-lg font-bold'>Results</button>
    </div>
  </div>
  <div ref={resultsRef} className='pt-10 h-[calc(100vh-5rem)] items-center justify-start flex flex-col'>
    <h1 className='font-extrabold text-4xl'>Your Results</h1>
    <div className="p-8 flex flex-col items-center w-full">
      {results.map((result:ResultProps)=> (
        <div key={useid} className="flex p-5 rounded-md justify-between items-center w-full my-3 mx-1 md:w-[30rem] h-10 outline-1 outline outline-gray-300">
          <h1 className='font-bold text-lg'>{result.testName}</h1>
          <h1 className='font-bold text-lg'>{result.scoredMark} Marks</h1>
        </div>
      ))}
    </div>
  </div>
</div>

)}
export default Home

      
