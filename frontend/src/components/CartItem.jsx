import useCartStore from '../store/cart'

const CartItem = (props) => {
    const {item, index} = props
    const cart = useCartStore(state => state.cart)
    const addToCart = useCartStore(state => state.addToCart)
    const removeFromCart = useCartStore(state => state.removeFromCart)

    return (
        <div key={item.id} style={{display: "flex", flexDirection: "row", gap: "20px"}}>
            <img src={item.mainImg} style={{flex: "0.2"}} width="auto" height="120px" />
            <div style={{display: "flex", flexDirection: "column", flex: "0.8"}}>
                <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <p>{item.name}</p>
                    <p onClick={() => removeFromCart(cart, item.id)}>X</p>
                </span>
                <span style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
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
                    <p>${Math.round((item.price*item.qty)*100)/100}</p>
                </span>
            </div>
        </div>
    )
}

export default CartItem