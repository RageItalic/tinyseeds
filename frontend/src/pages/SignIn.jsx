import { useState, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../utils/firebase'
import useAuthStore from "../store/auth";
import { redirect, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import styles from '../styles/signIn.module.css'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const setUser = useAuthStore(state => state.setUser)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            console.log("look here bruh ", userCredentials)
            //set user in store
            setUser(userCredentials.user)
            navigate("/")
        } catch (e) {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage)
            alert("Sign in failed. Try again.")
            setEmail("")
            setPassword("")
        }
    }

    return (
        <body>
            <div className={styles.container_1}>
                {/* <div> */}
                    <div className={styles.form_container}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h1>Sign In</h1>
                            <p>Its party thyme, welcome back!  &#127803;</p>
                            <div email>
                                <h4>email</h4>
                                <input type="email" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div password>
                                <h4>password</h4>
                                <input type="password" placeholder="password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className={styles.remember_container}>
                                <input type="checkbox" id="remember" name="remember" value="remember"></input>
                                <label for="remember">Remember Me?</label>
                            </div>
                            <div className={styles.forgot_container}>
                                <input type="checkbox" id="forgot" name="forgot" value="forgot"></input>
                                <label for="forgot">Forgot Username or Password?"</label>
                            </div>
                            <input type="button" className="button-signIn" value="Sign-In"></input>
                            {/* <button type="submit">Sign In</   button> */}
                        </form>
                    </div>
                    <div className={styles.pic_container}>
                        <img src="/src/assets/sign-in-right.jpg" alt="sign-in"/>
                    </div>
                {/* </div> */}
            </div>
        </body>
    )
}

export default SignIn