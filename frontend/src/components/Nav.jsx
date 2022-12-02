import { signOut } from "firebase/auth"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
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
            <PureModal
                header="Your Cart"
                footer={
                  <div>
                    <button>Checkout</button>
                  </div>
                }
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                width="400px"
            >
                <div style={{display: "flex", flexDirection: "column", gap: "25px"}}>
                    {cart.length > 0 
                    ? cart.map((item, index) => (
                        <div key={item.id} style={{display: "flex", flexDirection: "row", gap: "25px"}}>
                            <img src={item.mainImg} width="auto" height="120px" />
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <p>{item.name}</p>
                                <span style={{display: "flex", flexDirection: "row", gap: "5px"}}>
                                    <p onClick={() => item.qty === 1 
                                        ? removeFromCart(cart, item.id) 
                                        : addToCart("UPDATE_DECREMENT_ITEM", cart, {}, index)}
                                    >
                                        -
                                    </p>
                                    <p>{item.qty}</p>
                                    <p onClick={() => addToCart("UPDATE_INCREMENT_ITEM", cart, {}, index, item.capacityAvailable)}>+</p>
                                </span>
                            </div>
                        </div>
                    ))
                    : <p>Cart empty!</p>
                    }
                </div>
            </PureModal>
            {isVerifying && <p>loading...</p>}
            {user && isAuthenticated
            ?   <>
                    <p>Logged in as {user.displayName ?? user.email}</p>
                    <button onClick={() => handleUserSignOut()}>Sign out</button>
                    <p onClick={() => setModalIsOpen(true)}>View Cart ({cart.length} items)</p>
                    <p onClick={() => handleEmptyCart()}>Click to empty cart</p>
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