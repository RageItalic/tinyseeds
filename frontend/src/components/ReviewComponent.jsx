// import React from 'react'

import React, { useState, useEffect,useReducer } from "react";
import { useParams } from "react-router-dom";
import useCartStore from "../store/cart";
import { getPlant } from "../utils/helpers";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }
 

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

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    const handleAddToCart = (plantId, quantity) => {
      //if cart has plant with given id, just update qty and reset specific object on cart
      //else put in a new object
      let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
      console.log("plant found?", plantWithIdIndex)
  
      if (plantWithIdIndex === -1) {
        // const newItem = {
        //   id: plant.id,
        //   name: plant.name,
        //   price: plant.price,
        //   stripePriceId: plant.stripePriceId,
        //   mainImg: plant.imageURLS[0],
        //   capacityAvailable: plant.capacityAvailable,
        //   qty: quantity
        // }
        const testReview = {
          id: reviewId,
          value: {
            date: new Date(),
            description: description,
            id: reviewId,
            index: "3",
            ratingOutOf5: rating,
            title: title,
          },
      };
        addToCart("NEW_ITEM", cart, testReview)
      } else {
        //same plant obj found in cart
  
        //update plant obj in cart to increase qty
        addToCart("UPDATE_QUANTITY_AMOUNT", cart, { quantity }, plantWithIdIndex)
      }
    }
  
    const handleSubmit = event => {
      event.preventDefault();
      setSubmitting(true);
  
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    }
  
    const handleChange = event => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
    }
      if (loading) {
        return (
          <div>Loading...</div>
        )
      }
    
      return(
        <div className="wrapper">
          <h1>How About Them Apples</h1>
          {submitting &&
            <div>
              You are submitting the following:
              <ul>
                {Object.entries(formData).map(([name, value]) => (
                  <li key={name}><strong>{name}</strong>: {value.toString()}</li>
                ))}
              </ul>
            </div>
          }
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                <p>Name</p>
                <input name="name" onChange={handleChange}/>
              </label>
            </fieldset>
            <fieldset>
             <label>
               <p>Choose rating</p>
               <select name="apple" onChange={handleChange}>
                   <option value="">--Please choose an option--</option>
                   <option value="2">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
               </select>
             </label>
           </fieldset>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
    
    export default ReviewComponent;