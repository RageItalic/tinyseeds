import { useState, useEffect } from 'react'
import PureModal from 'react-pure-modal'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth'
import useCartStore from '../store/cart'
import CartItem from './CartItem'

const Cart = (props) => {
    const {modalIsOpen, setModalIsOpen} = props
    const cart = useCartStore(state => state.cart)
    const addToCart = useCartStore(state => state.addToCart)
    const user = useAuthStore(state => state.user)
    const [cartTotal, setCartTotal] = useState("0")
    const navigate = useNavigate()

    function handleEmptyCart() {
        localStorage.removeItem('cart')
        addToCart("LOAD_EXISTING_CART", [])
    }

    useEffect(() => {
        let total = 0
        cart.length > 0 && cart.forEach(item => total += Math.round((Number(item.price) * Number(item.qty)) * 100) / 100)
        setCartTotal(total)
    }, [cart])

    return (
        <PureModal
            header={`Your Cart`}
            footer={
                <div style={{display: "flex", gap: "25px"}}>
                    <button
                        disabled={cartTotal === 0}
                        onClick={() => handleEmptyCart()}
                        style={cartTotal === 0 ? {background: "grey"} : {}}
                    >
                        Empty Cart
                    </button>
                    <button
                        disabled={cartTotal === 0} 
                        onClick={() => {
                            setModalIsOpen(false)
                            navigate("/checkout")
                        }}
                        style={cartTotal === 0 ? {background: "grey"} : {}}
                    >
                        Checkout {user ? "" : "as guest"} (${cartTotal} total)
                    </button>
                </div>
            }
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            width="500px"
            scrollable={true}
            maxHeight={"450px"}
        >
            <div style={{display: "flex", flexDirection: "column", gap: "25px"}}>
                {cart.length > 0 
                    ? cart.map((item, index) => (
                        <CartItem item={item} index={index} key={item.id} />
                    ))
                    : <p>Cart empty!</p>
                }
            </div>
        </PureModal>
    )
}

export default Cart