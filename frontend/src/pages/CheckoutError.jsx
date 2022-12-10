import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import styles from "../styles/checkoutError.module.css";

const CheckoutError = () => {
    return (
        <div className={styles.container}>
            <div className={styles.CheckoutWrapper}>
                <div className={styles.h1_container}>
                    <h1>Checkout Failed!</h1>
                </div>
                <div className={styles.pic_container}>
                    <img src="/src/assets/error.png" alt="checkout" />
                </div>
                <div className={styles.p_container}>
                    <p>Your order has not been placed. Try again.</p>
                </div>
            </div>
        </div>
    )
}

export default CheckoutError

