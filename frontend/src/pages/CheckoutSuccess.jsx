import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import checkoutSuccessErrorStyles from '../styles/CheckoutSuccessSuccess.module.css'


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
        // <div>
            <div className={checkoutSuccessErrorStyles.container}>
                <div className={checkoutSuccessErrorStyles.h1_container}>
                    <h1>Checkout Success!</h1>
                </div>
                <div className={checkoutSuccessErrorStyles.pic_container}>
                    <img src="/src/assets/checkoutCart.png" alt="sign-in" />
                </div>
                <div className={checkoutSuccessErrorStyles.p_container}>
                    <p>Your order has been placed. Check your email for more details.</p>
                </div>
            </div>
        // </div>  
    );
};

export default CheckoutSuccess;

