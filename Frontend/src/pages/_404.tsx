import { useNavigate } from "react-router-dom"

export default function _404() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-3xl font-extrabold">Sorry this Page doesn't exist!</h1>
      <hr className="w-96 h-[1px] bg-gray-600 mt-5" />
      <a onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-500">Go back to Home</a>
    </div>
  )
}