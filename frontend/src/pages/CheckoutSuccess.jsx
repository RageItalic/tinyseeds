import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import checkoutSuccessErrorStyles from '../styles/CheckoutSuccessError.module.css'


const CheckoutSuccess = () => {
    const user = useAuthStore(state => state.user)
    const {isAuthenticated, isVerifying} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        //redirect person to sign in page if not signed in
        console.log("user?", user, isVerifying)
        if (!isAuthenticated && !isVerifying) {
            console.log('does this poop?')
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
        <div className={checkoutSuccessErrorStyles.container}>
            <h1>Checkout Success!</h1>
            <p>Your order has been placed. Check your email for more details.</p>
        </div>
    )
}

export default CheckoutSuccess

