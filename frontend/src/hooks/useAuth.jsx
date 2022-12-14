import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { useEffect } from "react"
import { getUser } from "../pages/SignIn"
import useAuthStore from "../store/auth"
import { auth } from "../utils/firebase"


export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [isVerifying, setIsVerifying] = useState(true)
    const setUser = useAuthStore(state => state.setUser)

    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userFromDb = await getUser(user.uid)
                user.displayName = userFromDb.name
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

    return {isAuthenticated, isVerifying}
}