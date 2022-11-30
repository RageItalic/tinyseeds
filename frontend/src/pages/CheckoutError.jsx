import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"


const CheckoutError = () => {
    const user = useAuthStore(state => state.user)
    const {isAuthenticated, isVerifying} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        //redirect person to sign in page if not signed in
        if (!isAuthenticated && !isVerifying) {
            navigate("/signin")        
        }

    }, [isAuthenticated, isVerifying])

    if (isVerifying) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Checkout Failed!</h1>
            <p>Your order has not been placed. Try again.</p>
        </div>
    )
}

export default CheckoutError

