// import React from 'react'

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCartStore from "../store/cart";
import { getPlant } from "../utils/helpers";


// const ReviewComponent = () => {
      
//   const handleUpdateQty = (product_id, e) => {
//     const parentInstance = this._reactInternalInstance._currentElement._owner._instance  
    
//    let newProducts = []
//    let newQty = e.target.value
  
//    parentInstance.state.products.forEach((product) => {
//      if(product.product_id == product_id) {
//        product.qty = newQty
//      }
//      newProducts.push(product);
//    })
       
//    parentInstance.setState({
//      products: newProducts      
//    })
   
//    console.log(parentInstance.state.products)
//  }
 
//   return (
//     <div>
//       <input type="number" name="quantityInput" min="0" id="quantityInput" onChange={(evt) => handleUpdateQty(2, evt.target.value)} />
//     </div>
//   )
// }

// export default ReviewComponent



const ReviewComponent = () => {

    const [cartquantity,setCartQuantity] = useState(0);
    const [loading, setLoading] = useState("");
    const [plant, setPlant] = useState("");
    const addToCart = useCartStore(state => state.addToCart)
    const cart = useCartStore(state => state.cart)
    const params = useParams()



    function handleSubmit(e) {
      e.preventDefault();
      console.log('You clicked submit.');
      console.log(cartquantity);
    }

    const handleAddToCart = (plantId) => {
        //if cart has plant with given id, just update qty and reset specific object on cart
        //else put in a new object
        let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
        console.log("plant found?", plantWithIdIndex)
        const newItem = {
            id: plant.id,
            name: plant.name,
            price: plant.price,
            stripePriceId: plant.stripePriceId,
            mainImg: plant.imageURLS,
            capacityAvailable: plant.capacityAvailable,
            qty: cartquantity
        }
    
        if (plantWithIdIndex === -1) {
         
            console.log(newItem.qty);
            addToCart("NEW_ITEM", cart, newItem)
    
        } 
        // else {
        //     //same plant obj found in cart
        //     const updateItem = {
        //       id: plant.id,
        //       name: plant.name,
        //       price: plant.price,
        //       stripePriceId: plant.stripePriceId,
        //       mainImg: plant.imageURLS,
        //       capacityAvailable: plant.capacityAvailable,
        //       qty: newItem.qty + cartquantity 
        //   }
        //     //update plant obj in cart to increase qty
        //     addToCart("UPDATE_QUANTITY_ITEM", cart, updateItem, plantWithIdIndex)
        // }
    }

    function handleChange(e) {
       setCartQuantity(e.target.value);
        console.log('You clicked submit.');
      }

    //   useEffect(() => {
    //     async function getFromDb() {
    //       let plants = await getPlant(params.plantID)
    //       console.log("TESTING", plants)
    //       setLoading(false)
    //       setPlant(plants)
        
    //     }
    //     getFromDb()
    //   }, []);
    
      if (loading) {
        return (
          <div>Loading...</div>
        )
      }
    
  
    return (
    //   <form>
    <div>
        <input type="number" name="quantity" id="quantity" value={cartquantity} onChange={handleChange}/>
        <button type="submit" onSubmit={handleAddToCart(plant.plantID)}>Submit</button>
        </div>
    //   </form>
    );
  }

  export default ReviewComponent