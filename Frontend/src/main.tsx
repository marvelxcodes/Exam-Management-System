import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContext } from './utils/AppContext'
import { useState } from 'react'
import Header from './components/Header'
import './utils/Tailwind.css'
import "bootstrap-icons/font/bootstrap-icons.css"

// Page imports
import Home from './pages/Home'
import Tests from './pages/Tests/Tests'
import Test from './pages/Tests/Test'
import Admin from './pages/Admin/Admin'
import Login from './pages/Login'

function App() {
    const [student, setStudent] = useState({
        id: '',
        name: '',
        isLoggedIn: false,
        class: 0
    })
    return(
<BrowserRouter>
    <AppContext.Provider value={{student,setStudent}}>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Admin' element={<Admin />} />
            <Route path='/Test/:id' element={<Test />} />
            <Route path='/Tests' element={<Tests />} />
        </Routes>
    </AppContext.Provider>
</BrowserRouter>
)}

const Root = document.getElementById('root')
createRoot(Root!).render( <App /> )