import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import useAuthStore from "../store/auth";
import { redirect, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import styles from "../styles/signIn.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("look here bruh ", userCredentials);
      //set user in store
      setUser(userCredentials.user);
      navigate("/");
    } catch (e) {
      const eCode = e.code;
      const eMessage = e.message;
      console.log(eCode, eMessage);
      alert("Sign in failed. Try again.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
        <div className={styles.container_1}>
            <div className={styles.form_container}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    {/* <h1 id="signIn_tag">Sign In</h1> */}
                    <div className={styles.title_container}>
                      <h1>Sign In</h1>
                    </div>
                    <div className={styles.blurb_container}>
                      <p>Its party thyme, welcome back! &#127803;</p>
                    {/* <p id="blurb_tag">Its party thyme, welcome back! &#127803;</p> */}
                    </div>
                    <div className={styles.email_container}>
                      {/* <div id="email_tag">
                        <h4>email</h4>
                      </div> */}
                      <h4 id="email_tag">email</h4>
                      <input type="email" placeholder="email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={styles.password_container}>
                      {/* <div id="password_tag">
                        <h4>password</h4>
                      </div> */}
                      <h4 id="password_tag">password</h4>
                      <input type="password" placeholder="password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.signIn_container}>
                        <input className="button" value="Sign-In" type="submit"/>
                    </div>  
                    {/* <button type="submit">Sign In</   button> */}
                </form>
            </div>
            <div className={styles.pic_container}>
              <img src="/src/assets/sign-in-right.jpg" alt="sign-in" />
            </div>
            {/* </div> */}
        </div>
    </div>
  );
};

export default SignIn;
