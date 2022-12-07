import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"


const CheckoutError = () => {
    return (
        <div>
            <h1>Checkout Failed!</h1>
            <p>Your order has not been placed. Try again.</p>
        </div>
    )
}

export default CheckoutError

