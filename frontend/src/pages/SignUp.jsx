import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../utils/firebase'
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";
import {nanoid} from 'nanoid'
import { getDatabase, ref, set } from "firebase/database";

const setUserInDb = (name, email, id) => {
    const db = getDatabase()
    const user = {
        id,
        name,
        email,
        type: "USER"
    }

    set(ref(db, `/users/${id}`), user)

}

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useAuthStore(state => state.setUser)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log("look here to see response from sign up method ", userCredentials)
            userCredentials.user.displayName = name
            setUserInDb(name, email, userCredentials.user.uid)
            setUser(userCredentials.user)
            navigate("/", { replace: true })
        } catch (e) {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage)
            alert("Signup failed. Try again.")
            setName("")
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div>
            <h1>SignUp page</h1>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="name..." value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <input type="email" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br/>
                    <input type="password" placeholder="password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br/>
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp