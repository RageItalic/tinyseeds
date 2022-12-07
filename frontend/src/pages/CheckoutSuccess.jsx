import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import checkoutSuccessErrorStyles from '../styles/CheckoutSuccessError.module.css'


const CheckoutSuccess = () => {
    return (
        <div className={checkoutSuccessErrorStyles.container}>
            <h1>Checkout Success!</h1>
            <p>Your order has been placed. Check your email for more details.</p>
        </div>
    )
}

export default CheckoutSuccess

