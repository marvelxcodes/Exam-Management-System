import { FC } from 'react'
import { useState } from 'react'
import AdminPanel from '../../components/AdminPanel'

const Admin : FC = () => {
    const [isSignedIn, setIsSignedIn ] = useState(!false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    function Login(e:any) {
        e.preventDefault()
        if (username==='admin') {
            if (password==='pepscbse001') {
                setIsSignedIn(true)
            } else {
                alert('Please enter the appropriate credentials!')
            }
        } else {
            alert('Please enter an appropriate credentials!')
        }
    }
    return(
<div className='pt-16'>
    <div style={isSignedIn?{display:'none'}:{}} className='bg-pink-200 min-h-[calc(100vh-5rem)] flex items-center justify-center'>
        <form onSubmit={(e) => Login(e)} className="flex flex-col relative items-center h-72 w-56 bg-white shadow-2xl justify-center">
            <h1 className='absolute top-10 text-2xl text-pink-300 accent-pink-300 font-extrabold'>Admin Login</h1>
            <input onChange={E => setUsername(E.target.value)} type="text" placeholder='Username' name="username" className='text-center w-[calc(100%-1rem)] text-pink-300 outline-1 outline mb-3 bg-gray-100 h-10' />
            <input onChange={E => setPassword(E.target.value)} type="password" placeholder='Password' name="password" className='text-center w-[calc(100%-1rem)] text-pink-300 outline-1 outline bg-gray-100 h-10' />
            <button onClick={Login} className="h-10 m-2 absolute bottom-0 bg-pink-500 text-white text-lg  w-[calc(100%-1rem)]">LOGIN</button>
        </form>
    </div>
    <AdminPanel isSignedIn={isSignedIn} />
</div>
)}

export default Admin