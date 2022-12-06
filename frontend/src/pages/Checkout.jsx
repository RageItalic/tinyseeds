import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CartItem from "../components/CartItem"
import useAuthStore from "../store/auth"
import useCartStore from "../store/cart"
import { nanoid } from 'nanoid'



const Checkout = () => {
    const cart = useCartStore(state => state.cart)
    const addToCart = useCartStore(state => state.addToCart)
    const user = useAuthStore(state => state.user)
    const navigate = useNavigate()
    const [cartTotal, setCartTotal] = useState(0)
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [exp, setExp] = useState("")
    const [cvc, setCvc] = useState("")

    const handlePayment = (e) => {
        e.preventDefault()

        const checkoutAttempt = Number(localStorage.getItem("checkoutAttempt"))

        if (checkoutAttempt <= 1 ) {
            //success

            let productsBought = cart.map(item => ({
                id: nanoid(),
                productId: item.id,
                qty: item.qty
            }))

            let purchaseOrder = {
                id: nanoid(),
                buyerId: user ? user.uid : `guest-${nanoid()}`,
                email: user ? user.email : email,
                date: Date.now(),
                productsBought,
                status: "ORDERED",
                totalPrice: cartTotal
            }

            console.log("purchase order made: ", purchaseOrder)

            //call helper function here to store purchase order in purchase order node

            localStorage.setItem("checkoutAttempt", checkoutAttempt + 1)
            navigate("/checkout/success")
        } else {
            //failure
            localStorage.setItem("checkoutAttempt", 0)
            navigate("/checkout/error")
        }

        //empty cart after payment (need to ask prof if we need to empty only on successful checkout or in case of error as well as here)
        localStorage.removeItem('cart')
        addToCart("LOAD_EXISTING_CART", [])
    }

    const handleZipCodeInput = (e) => {
        //do card number regex validation here

        setZipCode(e.target.value)
    }

    const handleCardNumberInput = (e) => {
        //do card number regex validation here

        setCardNumber(e.target.value)
    }

    const handleExpiryInput = (e) => {
        //do card number regex here

        setExp(e.target.value)
    }

    const handleCvcInput = (e) => {
        //do card number regex here

        setCvc(e.target.value)
    }

    useEffect(() => {


        let total = 0
        cart.length > 0 && cart.forEach(item => total += Math.round((Number(item.price) * Number(item.qty)) * 100) / 100)
        setCartTotal(total)

        if (user !== null) {
            //user is logged in
            setEmail(user.email)
            setCardName(user.displayName ?? "")
        }
    }, [cart, user])

    return (
        <div style={{display: "flex", flexDirection: "row", height: "100vh"}}>
            
            {/* left section */}
            <div style={{display: "flex", flex: "0.5", flexDirection: "column", padding: "20px"}}>
                <div style={{display: "flex", flex: "1", alignItems: "center", flexDirection: "column"}}>
                    <h3 style={{marginBottom: "0px", color: "gray"}}>Pay Tiny Seeds</h3>
                    <h1 style={{marginTop: "0px"}}>$ {cartTotal}</h1>
                    <h4>You are checking out as {user ? user.email : 'guest'}</h4>
                    <div style={{display: "flex", flexDirection: "column", width: "400px", gap: "25px"}}>
                        {cart.length > 0 
                            ? cart.map((item, index) => (
                                <CartItem item={item} index={index} key={item.id} />
                            ))
                            : <p style={{textAlign: "center"}}>Cart Empty!</p>
                        }
                    </div>
                </div>
            </div>

            {/* right section */}
            <div style={{display: "flex", flex: "0.5", boxShadow: "-8px 0px 15px -3px rgba(0,0,0,0.1)", flexDirection: "column", padding: "20px"}}>
                <h1>This is the checkout page</h1>
                <h4 style={{textAlign: "center"}}>Pay with card</h4>
                <form onSubmit={(e) => handlePayment(e)}>
                    <div>
                        <label>Email</label>
                        <br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email..." required />
                    </div>
                    <br />
                    <div>
                        <label>Address</label>
                        <br />
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Rainbow Lane, Unicorn Town, Imaginarium" required />
                        <input type="text" value={zipCode} onChange={(e) => handleZipCodeInput(e)} placeholder="Q9A P0Z" required />
                        <input type="text" value="Canada" readOnly placeholder="country..."  />
                    </div>
                    <br />
                    <div>
                        <label>Card Information</label>
                        <br />
                        <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Oswald Oswaldson" required />
                        <input type="text" value={cardNumber} onChange={(e) => handleCardNumberInput(e)} placeholder="1234 1234 1234 1234" required />
                        <input type="text" value={exp} onChange={(e) => handleExpiryInput(e)} placeholder="MM / YY" required />
                        <input type="text" value={cvc} onChange={(e) => handleCvcInput(e)} placeholder="CVC" required />
                    </div>
                    <br />
                    <button type="submit">Pay</button>
                </form>
            </div>
        </div>
    )
}

export default Checkout