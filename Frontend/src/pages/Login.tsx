import { FC } from 'react'
import useLogin from '../hooks/Login'
import { useState } from 'react'

const Login : FC = () => {
    const [adminId, setAdminId] = useState('')
    const [password, setPassword] = useState('')
    const [ handleLogin ] = useLogin({adminId, password})
    return(
<div className='pt-20 flex items-center bg-pink-100 justify-center h-screen'>
    <form onSubmit={handleLogin} className="flex flex-col relative h-80 w-64 shadow-xl bg-white items-center justify-center rounded-md">
        <h3 className="font-bold text-3xl absolute top-8">Login</h3>
        <input onChange={e=>setAdminId(e.target.value)} className='bg-gray-100 text-center m-2 h-10 w-[calc(100%-1rem)] p-3 rounded-sm' placeholder='Admission Number' type='number' name="Username" />
        <input onChange={e=>setPassword(e.target.value)} className='bg-gray-100 text-center m-2 h-10 w-[calc(100%-1rem)] p-3 rounded-sm' placeholder='Password' type="password" name="Password" />
        <button onClick={handleLogin} className='absolute bottom-2 rounded-sm bg-pink-500 text-white h-10 w-[calc(100%-1rem)]' type="submit">Login</button>
    </form>
</div>
)}

export default Login