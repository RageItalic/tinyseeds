import { useState, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../utils/firebase'
import useAuthStore from "../store/auth";
import { redirect, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

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
        <div>
            <h1>Sign In page</h1>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="email" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br/>
                    <input type="password" placeholder="password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br/>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn