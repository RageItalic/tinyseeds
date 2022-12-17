import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/cart";
import useWishlistStore from "../store/wishlist";
import allPlantStyles from "../styles/allPlants.module.css";

const PlantCard = (props) => {
  const plant = props.plant
  const addToCartVisible = props.addToCartVisible
  const addToWishlistVisible = props.addToWishlistVisible
  const addToCart = useCartStore(state => state.addToCart)
  const cart = useCartStore(state => state.cart)
  const wishlist = useWishlistStore(state => state.wishlist)
  const addToWishlist = useWishlistStore(state => state.addToWishlist)
  const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist)
  
  const handleAddToCart = (plantId) => {
    //if cart has plant with given id, just update qty and reset specific object on cart
    //else put in a new object
    let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
    console.log("plant found?", plantWithIdIndex)

    //item not found in cart.. therefore, new item added
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
    }
  }

  const handleWishlistClick = (plant) => {
    wishlist.find(p => p.id === plant.id) === undefined
      ? addToWishlist(plant)
      : removeFromWishlist(wishlist, plant.id)
  }

  useEffect(() => {
    //store cart in localStorage every time it updates
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  return (
    <div style={{ maxWidth: "300px" }}>
      <div style={{ position: "relative" }}>
        <Link to={`/plants/${plant.id}`}>
          <img src={plant.imageURLS[0]} width="100%" height="auto" />
        </Link>
        <p 
          onClick={() => handleWishlistClick(plant)}
          style={{
            position: "absolute",
            top: "-3%",
            zIndex: "1",
            right: "4%",
            color: "white",
            fontSize: "25px",
            cursor: "pointer"
          }}
        >
          {addToWishlistVisible && wishlist.find(p => p.id === plant.id) === undefined 
            ? "☆"
            : "⭐️"
          }
        </p>
        {addToCartVisible &&
          <button
            style={{
              position: "absolute",
              bottom: "5%",
              width: "95%",
              zIndex: "1",
              right: "2.5%",
              color: "white",
              borderRadius: "8px",
            }}
            onClick={() => handleAddToCart(plant.id)}
          >
            Add To Cart
          </button>
        }
      </div>
      <Link to={`/plants/${plant.id}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p>{plant.name}</p>
          <p>{plant.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default PlantCard;
