import { signOut } from "firebase/auth"
import { child, getDatabase, ref, get, set } from "firebase/database"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import useCartStore from "../store/cart"
import { auth } from "../utils/firebase"

const Nav = () => {
    const navigate = useNavigate()
    const user = useAuthStore(state => state.user)
    const setUser = useAuthStore(state => state.setUser)
    const cart = useCartStore(state => state.cart)
    const addToCart = useCartStore(state => state.addToCart)
    const {isAuthenticated, isVerifying} = useAuth()

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

    useEffect(() => {
        // get cart from localstorage on page refresh
        if (cart.length === 0) {
            let newCart = JSON.parse(localStorage.getItem('cart'))
            console.log("testy test", newCart)
            newCart !== null
                ? addToCart([...newCart])
                : addToCart([])
        }
    }, [])

    return (
        <nav>
            {isVerifying && <p>loading...</p>}
            {user && isAuthenticated
            ?   <>
                    <p>Logged in as {user.displayName ?? user.email}</p>
                    <button onClick={() => handleUserSignOut()}>Sign out</button>
                    <p>CART ({cart.length} items)</p>
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
        </nav>
    )
}

export default Nav