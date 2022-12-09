import { signOut } from "firebase/auth";
import { child, getDatabase, ref, get, set } from "firebase/database";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAuthStore from "../store/auth";
import { auth } from "../utils/firebase";
import navStyles from "../styles/nav.module.css";

const Nav = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { isAuthenticated, isVerifying } = useAuth();

  async function handleUserSignOut() {
    try {
      console.log("signing out");
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (e) {
      const eCode = e.code;
      const eMessage = e.message;
      console.log(eCode, eMessage);
      alert("Logout failed. Try again.");
    }
  }

  return (
    <nav>
      {isVerifying && <p>loading...</p>}
      {user && isAuthenticated ? (
        <>
          <p>Logged in as {user.displayName ?? user.email}</p>
          <button onClick={() => handleUserSignOut()}>Sign out</button>
        </>
      ) : (
        <>
          <ul className={navStyles.list}>
            <li id={navStyles.li}>
              <Link to="/signup">Register</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/signin">Sign in</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/plants"> All Plants</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/plants/1">Individual Plant</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/examples">Examples</Link>
            </li>
          </ul>
        </>
      )}
      <br />
      <Link to="/plants">All Plants</Link>
      <br />
      <Link to="/plants/1">Individual Plant</Link>
      <br />
      <Link to="/examples">Examples</Link>
    </nav>
  );
};
export default Nav;
