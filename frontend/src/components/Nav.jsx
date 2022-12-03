import { signOut } from "firebase/auth"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import useCartStore from "../store/cart"
import { auth } from "../utils/firebase"
import Cart from "./Cart";

const Nav = () => {
    const navigate = useNavigate()
    const user = useAuthStore(state => state.user)
    const setUser = useAuthStore(state => state.setUser)
    const cart = useCartStore(state => state.cart)
    const addToCart = useCartStore(state => state.addToCart)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const {isAuthenticated, isVerifying} = useAuth()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    async function handleUserSignOut() {
        try {
            console.log("signing out")
            await signOut(auth)
            setUser(null)
            navigate("/")
        } catch (e) {
            const eCode = e.code;
            const eMessage = e.message;
            console.log(eCode, eMessage)
            alert("Logout failed. Try again.")
        }
    }

    function handleEmptyCart() {
        localStorage.removeItem('cart')
        addToCart("LOAD_EXISTING_CART", [])
    }

    useEffect(() => {
        // get cart from localstorage on page refresh
        if (cart.length === 0) {
            let newCart = JSON.parse(localStorage.getItem('cart'))
            newCart !== null
                ? addToCart("LOAD_EXISTING_CART", newCart)
                : addToCart("LOAD_EXISTING_CART", [])
        }
    }, [])

    return (
        <nav>
            <Cart modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}  />
            {isVerifying && <p>loading...</p>}
            {user && isAuthenticated
            ?   <>
                    <p>Logged in as {user.displayName ?? user.email}</p>
                    <button onClick={() => handleUserSignOut()}>Sign out</button>
                </>
            :   <>
                    <Link to="/signup">Sign up</Link>
                    <br />
                    <Link to="/signin">Sign in</Link>
                </>
            }
            <br />
            <Link to="/plants">All Plants</Link>
            <br />
            <Link to="/plants/1">Individual Plant</Link>
            <br />
            <Link to="/examples">Examples</Link>
            <br />
            <p onClick={() => setModalIsOpen(true)}>View Cart ({cart.length} items)</p>
            <p onClick={() => handleEmptyCart()}>Click to empty cart</p>
        </nav>
    )
}

export default Nav