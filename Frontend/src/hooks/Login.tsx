import { AppContext, useContext } from "../utils/AppContext"
import { useNavigate } from "react-router-dom"
import URL from "../utils/URL"

export default function useLogin({adminId, password}:any) {
    const navigate = useNavigate()
    const context = useContext(AppContext)

    async function handleLogin(e:any) {
        e.preventDefault()
        if(adminId) {
            if(password) {
                const res = await fetch(`${URL}/student/${adminId}`)
                const student = await res.json()
                if(student=='error') {
                    alert('Student not Registered!')
                } else {
                    if(password==student.password) {
                        context.setStudent({
                            id: student.id,
                            name: student.name,
                            isLoggedIn: true,
                            class: student.class
                        })
                        navigate('/')
                    } else {
                        alert('Please enter the appropriate credentials!')
                    }
            }
            } else {
                alert('Please enter the appropriate credentials!')
            }
        } else {
            alert('Please enter the appropriate credentials!')
        }
    }

    return [handleLogin]
}