import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CartItem from "../components/CartItem"
import useAuthStore from "../store/auth"
import useCartStore from "../store/cart"
import { nanoid } from 'nanoid'
import styles from "../styles/checkout.module.css";
import { saveOrder } from "../utils/helpers"



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

        if (!isZipCodeValid(zipCode)){
            return
        }

        if (!isCardValid(cardNumber)){
            return
        }

        if (!isCvcInputValid(cvc)){
            return
        }

        if (!isCardExpired(exp)){
            return
        }



        const checkoutAttempt = Number(localStorage.getItem("checkoutAttempt"))

        if (checkoutAttempt <= 1 ) {
            //success

            let productsBought = {}
            cart.forEach(item => {
                let id = nanoid()
                productsBought[id] = {
                    id,
                    productId: item.id,
                    qty: item.qty
                }
            })
            let purchaseOrderId = nanoid()
            let purchaseOrder = {
                id: purchaseOrderId,
                value: {
                    id: purchaseOrderId,
                    buyerId: user ? user.uid : `guest-${nanoid()}`,
                    email: user ? user.email : email,
                    date: new Date().toISOString(),
                    productsBought,
                    status: "ORDERED",
                    totalPrice: cartTotal
                }
            }

            //call helper function here to store purchase order in purchase order node
            saveOrder(purchaseOrder)

            //empty cart after payment 
            localStorage.removeItem('cart')
            addToCart("LOAD_EXISTING_CART", [])

            localStorage.setItem("checkoutAttempt", checkoutAttempt + 1)
            navigate("/checkout/success", { replace: true })
        } else {
            //failure
            localStorage.setItem("checkoutAttempt", 0)
            navigate("/checkout/error")
        }

        
    }

    const isZipCodeValid = (zip) => {
        //do card number regex validation here
        const zipRegEx = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
        if(!zipRegEx.test(zip)){
            alert("Zip code not valid!")
            setZipCode("")
            return false
        }
        return true
    }

    const isCardValid = (card) => {
        //do card number regex validation here
        const cardNum = card.replaceAll(" ", "").replaceAll("-", "")  
        console.log("CHECKING CARD NUM", cardNum)
        const cardRegex = /\d{16}/g
        if(!cardRegex.test(cardNum)){
            alert("Card number not valid!")
            setCardNumber("")
            return false
        }
        return true
    }

    const isCardExpired = (exp) => {
        //do card number regex here
        // const expDate = /^\d{2}\/\d{2}$/g
        console.log("CHECKING EXP TOP", exp)
        const date = new Date();
        let todayYear = Number(date.getFullYear().toString().split("20")[1]);
        let todayMonth = date.getMonth() + 1;
        let userExpMonth = Number(exp.split("/")[0])
        let userExpYear = Number(exp.split("/")[1])

        if (userExpYear > todayYear){
            // console.log("User Year valid!",userExpYear )
            // console.log("TODAY YEAR", todayYear)
            // console.log("TODAY MONTH", todayMonth)
            // console.log("CHECKING EXP", exp)
            return true
        }
        else if (todayYear === userExpYear){
            if(userExpMonth > todayMonth){
                // console.log("TODAY YEAR", todayYear)
                // console.log("TODAY MONTH", todayMonth)
                // console.log("CHECKING EXP", exp)
                // console.log("User Month valid!",userExpMonth)
                return true
            }
            if(userExpMonth === todayMonth){
                // console.log("TODAY YEAR", todayYear)
                // console.log("TODAY MONTH", todayMonth)
                // console.log("CHECKING EXP", exp)
                // console.log("User Month valid!",userExpMonth)
                return true
            }
        }
        // else{
            // return false
            // console.log("TODAY YEAR", todayYear)
            // console.log("TODAY MONTH", todayMonth)
            // console.log("CHECKING EXP", exp)

            alert("Checking...Card not valid!")
            setExp("")
            return false
        // } 
    }

    const isCvcInputValid = (c) => {
        //do card number regex here
        const cvcRegEx = /^[0-9]{3,4}$/
        console.log("CHECKING CVC", c)
        if(!cvcRegEx.test(c)){
            alert("CVC number not valid!")
            setCvc("")
            return false
        }
        return true
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
        <div style={{display: "flex", flexDirection: "row", height: "100vh", backgroundColor: "white"}}>
            {/* left section */}
            <div style={{display: "flex", flex: "0.5", flexDirection: "column", padding: "20px", backgroundColor: "white", overflow: "auto"}}>
                <div style={{display: "flex", flex: "1", alignItems: "center", flexDirection: "column"}}>
                    <h3 style={{marginBottom: "0px", color: "gray", alignItems: "center"}}>Pay Tiny Seeds</h3>
                    <h1 style={{marginTop: "0px"}}>$ {cartTotal}</h1>
                    <h4>You are checking out as {user ? user.email : 'guest'}</h4>
                    <div style={{display: "flex", flexDirection: "column", width: "400px", gap: "25px"}}>
                        {cart.length > 0 
                            ? cart.map((item, index) => (
                                <CartItem item={item} index={index} key={item.id} />
                            ))
                            : <p>Cart Empty!</p>
                        }
                    </div>
                </div>
            </div>

            {/* right section */}
            <div style={{display: "flex", flex: "0.5", boxShadow: "-8px 0px 15px -3px rgba(0,0,0,0.1)", flexDirection: "column", padding: "20px", backgroundColor:"white"}}>
                <div className={styles.h1_container}>
                    <h1>Pay with card</h1>
                </div>
                <div className={styles.h4_container}>
                    <h4> :] </h4>
                </div>
                <div className={styles.form_container}>
                    <form onSubmit={(e) => handlePayment(e)}>
                        <div>
                            <label id={styles.email}>Email</label>
                            <br />
                            <input className={styles.form_input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email..." required />
                        </div>
                        <br />
                        <div>
                            <label id={styles.address}>Address</label>
                            <br />
                            <input className={styles.form_input} type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Rainbow Lane, Unicorn Town, Imaginarium" required />
                            <input className={styles.form_input} type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Q9A P0Z" required />
                            <input className={styles.form_input} type="text" value="Canada" readOnly placeholder="country..."  />
                        </div>
                        <br />
                        <div>
                            <label id={styles.cardInfo}>Card Information</label>
                            <br />
                            <input className={styles.form_input} type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Oswald Oswaldson" required />
                            <input className={styles.form_input} type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 1234 1234 1234" required />
                            <input className={styles.form_input} type="text" value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM / YY" required />
                            <input className={styles.form_input} type="text" value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="CVC" required />
                        </div>
                        <br />
                        <button className={styles.checkout} type="submit">Pay</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout