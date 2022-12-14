import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import signUpStyles from "../styles/SignUp.module.css";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    <div className={signUpStyles.page}>
      <div className={signUpStyles.box}>
        <h1 className={signUpStyles.fixMe}>Register</h1>
        <p className={signUpStyles.fixMeParagraph}>
          By signing up I agree to the tiny seeds Privacy Policy and Terms of
          Service
        </p>

        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id={signUpStyles.input}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <h8 id={signUpStyles.underBoxText}>
                <b>Make sure it matches the name on your government ID</b>
              </h8>
            </div>
            <input
              id={signUpStyles.input}
              type="text"
              placeholder="Email Address"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <div>
              <h8 id={signUpStyles.underBoxText}>
                <b>We'll email you purchase confirmation and receipts</b>
              </h8>
            </div>
            <input
              id={signUpStyles.input}
              type="text"
              placeholder="Password"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br></br>
            <button type="submit" id={signUpStyles.myButton}>
              Create Account
            </button>{" "}
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
