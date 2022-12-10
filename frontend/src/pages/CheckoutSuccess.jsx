import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import styles from '../styles/checkoutSuccess.module.css'


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
    };

    return (
        <div className={styles.container}>
            <div className={styles.CheckoutWrapper}>
                <div className={styles.h1_container}>
                    <h1>Checkout Success!</h1>
                </div>
                <div className={styles.pic_container}>
                    <img src="/src/assets/checkoutCart.png" alt="checkout" />
                </div>
                <div className={styles.p_container}>
                    <p>Your order has been placed. Check your email for more details.</p>
                </div>
            </div>
        </div> 
    );
};

export default CheckoutSuccess;