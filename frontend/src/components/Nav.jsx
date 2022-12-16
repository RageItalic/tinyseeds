import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useAuth } from "../hooks/useAuth";
import useAuthStore from "../store/auth";
import useCartStore from "../store/cart";
import { signOut } from "firebase/auth";
import Cart from './Cart'
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { auth } from "../utils/firebase";
import navStyles from "../styles/nav.module.css";

const Nav = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const { isAuthenticated, isVerifying } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  useEffect(() => {
    // get cart from localstorage on page refresh
    if (cart.length === 0) {
      let newCart = JSON.parse(localStorage.getItem("cart"));
      newCart !== null
        ? addToCart("LOAD_EXISTING_CART", newCart)
        : addToCart("LOAD_EXISTING_CART", []);
    }
    console.log("isVerifying: ", isVerifying);
  }, [isVerifying]);

  return (
    <nav>
      <Cart modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      {isVerifying && <p>loading...</p>}
      {user && isAuthenticated ? (
        <>
          <ul id={navStyles.list}>
            <li id={navStyles.li}>
              <Link to="/">Tiny Seeds</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/plants"> Plants</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/plants/1">Individual Plant</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/examples">Examples</Link>
            </li>
            <div className="right">
              <li id={navStyles.liRight}>
                <a onClick={() => handleUserSignOut()}>Sign out</a>
              </li>
              <li id={navStyles.liRight}>
                <a>{user.displayName ?? user.email}</a>
              </li>
              <li id={navStyles.liRight}>
                <Link to="/orders">Orders</Link>
              </li>
              <li id={navStyles.liRight}>
                <a onClick={() => setModalIsOpen(true)}>Cart ({cart.length})</a>
              </li>
              <li id={navStyles.liRight}>
                <a> Wishlist</a>
              </li>
            </div>
          </ul>
        </>
      ) : (
        <>
          <ul id={navStyles.list}>
            <li id={navStyles.li}>
              <Link to="/Home">Tiny Seeds</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/plants"> Plants</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/examples">Cart</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/plants/1">Individual Plant</Link>
            </li>
            <li id={navStyles.li}>
              <Link to="/examples">Examples</Link>
            </li>
            <div className="right">
              <li id={navStyles.liRight}>
                <Link to="/signup">Register</Link>
              </li>
              <li id={navStyles.liRight}>
                <Link to="/signin">Sign in</Link>
              </li>
              <li id={navStyles.liRight}>
                <a onClick={() => setModalIsOpen(true)}>Cart ({cart.length})</a>
              </li>
            </div>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Nav
