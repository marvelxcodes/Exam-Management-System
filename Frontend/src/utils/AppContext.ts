import { createContext, useContext } from "react"

const AppContext = createContext({
    student: {
        id: '',
        name: '',
        isLoggedIn: false,
        class: 11
    },
    setStudent: ( {} : any ) => {}
})

export { AppContext, useContext}