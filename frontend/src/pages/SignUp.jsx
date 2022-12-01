import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import useAuthStore from "../store/auth";
import { redirect, useNavigate } from "react-router-dom";
import signUpStyles from "../styles/SignUp.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(
        "look here to see response from sign up method ",
        userCredentials
      );
      userCredentials.user.displayName = name;
      setUser(userCredentials.user);
      navigate("/");
    } catch (e) {
      const eCode = e.code;
      const eMessage = e.message;
      console.log(eCode, eMessage);
      alert("Signup failed. Try again.");
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={signUpStyles.page}>
      <div className={signUpStyles.box} id={signUpStyles.flexContainer}>
        <h1>Sign Up</h1>
        <p>
          By signing up I agree to the tiny seeds Privacy Policy and Terms of
          Service
        </p>

        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id={signUpStyles.input}
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id={signUpStyles.input}
              type="text"
              placeholder="Last Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <div>
              <h8 id={signUpStyles.underBoxText}>
                <b>Make sure it matches the name on your government ID</b>
              </h8>
            </div>
            <br />
            <input
              id={signUpStyles.input}
              type="text"
              placeholder="Birthdate (mm/dd/yy)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <h8 id={signUpStyles.underBoxText}>
                <b>
                  To sign up, you need to be at least 18. Your birthday won't be
                  shared with other people who use tiny seeds
                </b>
              </h8>
            </div>
            <br></br>
            <input
              id={signUpStyles.input}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <h8 id={signUpStyles.underBoxText}>
                <b>We'll email you purchase confirmation and receipts</b>
              </h8>
            </div>
            <br />
            <input
              id={signUpStyles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
