import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { useEffect } from "react"
import useAuthStore from "../store/auth"
import { auth } from "../utils/firebase"


export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [isVeryifying, setIsVerifying] = useState(true)
    const setUser = useAuthStore(state => state.setUser)

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                console.log("auth hook used! User authenticated!!")
            } else {
                setIsAuthenticated(false)
                setUser(null)

                console.log("auth hook used! User signed out!!")
            }
            setIsVerifying(false)
        })

    }, [])

    return {isAuthenticated, isVeryifying}
}