import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useAuthStore from "../store/auth"
import useCartStore from "../store/cart"

const PlantCard = (props) => {
    const plant = props.plant
    const addToCart = useCartStore(state => state.addToCart)
    const cart = useCartStore(state => state.cart)
    const {isAuthenticated, isVerifying} = useAuth()
    const user = useAuthStore(state => state.user)
    const navigate = useNavigate()

    const handleAddToCart = (plantId) => {
        if (!user && !isAuthenticated && !isVerifying) {
            alert("Log In or Sign up before adding to cart")
            navigate("/signin")
        }

        //if cart has plant with given id, just update qty and reset specific object on cart
        //else put in a new object
        let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
        console.log("plant found?", plantWithIdIndex)

        if (plantWithIdIndex === -1) {
            const newItem = {
                id: plant.id,
                name: plant.name,
                price: plant.price,
                stripePriceId: plant.stripePriceId,
                mainImg: plant.imageURLS[0],
                capacityAvailable: plant.capacityAvailable,
                qty: 1
            }
            addToCart("NEW_ITEM", cart, newItem)
        } else {
            //same plant obj found in cart
            
            //update plant obj in cart to increase qty
            addToCart("UPDATE_INCREMENT_ITEM", cart, {}, plantWithIdIndex)


            // let newCart = [...cart]
            // newCart[plantWithIdIndex]["qty"] += 1
            // addToCart(newCart)
        }
    }

    useEffect(() => {
        //store cart in localStorage every time it updates
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <div style={{maxWidth: "300px"}}>
            <div style={{position: "relative"}}>
                <Link to={`/plants/${plant.id}`}>
                    <img src={plant.imageURLS[0]} width="100%" height="auto" />
                </Link>
                <button 
                    style={{position: "absolute", bottom: "5%", width: "95%", zIndex: "1", right: "2.5%", color: "white"}}
                    onClick={() => handleAddToCart(plant.id)}
                >
                    Add To Cart
                </button>
            </div>
            <Link to={`/plants/${plant.id}`}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <p>{plant.name}</p>
                    <p>{plant.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default PlantCard