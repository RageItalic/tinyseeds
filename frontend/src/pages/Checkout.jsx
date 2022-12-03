import { useState } from "react"
import { useEffect } from "react"
import CartItem from "../components/CartItem"
import useAuthStore from "../store/auth"
import useCartStore from "../store/cart"


const Checkout = () => {
    const [cartTotal, setCartTotal] = useState(0)
    const cart = useCartStore(state => state.cart)
    const user = useAuthStore(state => state.user)

    useEffect(() => {
        let total = 0
        cart.length > 0 && cart.forEach(item => total += Math.round((Number(item.price) * Number(item.qty)) * 100) / 100)
        setCartTotal(total)
    }, [cart])

    return (
        <div style={{display: "flex", flexDirection: "row", height: "100vh"}}>
            <div style={{display: "flex", flex: "0.5", flexDirection: "column", padding: "20px"}}>
                <div style={{display: "flex", flex: "1", alignItems: "center", flexDirection: "column"}}>
                    <h3 style={{marginBottom: "0px", color: "gray"}}>Pay Tiny Seeds</h3>
                    <h1 style={{marginTop: "0px"}}>$ {cartTotal}</h1>
                    <h4>You are checking out as {user ? user.email : 'guest'}</h4>
                    <div style={{display: "flex", flexDirection: "column", width: "400px", gap: "25px"}}>
                        {cart.map((item, index) => (
                            <CartItem item={item} index={index} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
            <div style={{display: "flex", flex: "0.5", boxShadow: "-8px 0px 15px -3px rgba(0,0,0,0.1)", flexDirection: "column", padding: "20px"}}>
                <h1>This is the checkout page</h1>
                <h4>You are checking out as {user ? user.email : 'guest'}</h4>
            </div>
        </div>
    )
}

export default Checkout