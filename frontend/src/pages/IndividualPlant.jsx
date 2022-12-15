
import styles from "../styles/individualplants.module.css"

import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewComponent from '../components/ReviewComponent';
import useCartStore from "../store/cart"
import { getPlant } from '../utils/helpers';

const IndividualPlant = () => {
  const params = useParams();
  const [plant, setPlant] = useState("");
  const [loading, setLoading] = useState("");
  const addToCart = useCartStore(state => state.addToCart)
  const cart = useCartStore(state => state.cart)
  const [quantity, setQuantity] = useState(0);
  const [isActive, setIsActive] = useState(null);
  const [careguideisActive, setcareguideIsActive] = useState(null);
  const [shippingisActive, setshippingIsActive] = useState(null);

  const handleAddToCart = (plantId, quantity) => {
    //if cart has plant with given id, just update qty and reset specific object on cart
    //else put in a new object
    let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
    console.log("plant found?", plantWithIdIndex)
    
    const newItem = {
      id: plant.id,
      name: plant.name,
      price: plant.price,
      stripePriceId: plant.stripePriceId,
      mainImg: plant.imageURLS[0],
      capacityAvailable: plant.capacityAvailable,
      qty: 0
    }

    if (plantWithIdIndex === -1) {
      if(quantity > 10) {
        alert("Out of stock");
        return;
      }
      newItem.qty = quantity;
      addToCart("NEW_ITEM", cart, newItem)
      // console.log(cart)
    } 
   
    else {
      //same plant obj found in cart
      // console.log(newItem.qty)
      // const newItems = {
      //   id: plant.id,
      //   name: plant.name,
      //   price: plant.price,
      //   stripePriceId: plant.stripePriceId,
      //   mainImg: plant.imageURLS[0],
      //   capacityAvailable: plant.capacityAvailable,
      //   qty: quantity
      // }

      // const value = (quantity*1) + newItem.qty
  
      // console.log(newItem.qty)
      // console.log(value)
      newItem.qty = quantity;
      //update plant obj in cart to increase qty
      addToCart("UPDATE_QUANTITY_AMOUNT", cart,newItem, plantWithIdIndex)
      
    }
  }

  useEffect(() => {
    //store cart in localStorage every time it updates
    async function getFromDb() {
      let plants = await getPlant(params.plantID)
      console.log("TESTING", plants)
      setLoading(false)
      setPlant(plants)
    }
    getFromDb()
    localStorage.setItem('cart', JSON.stringify(cart))

  }, [cart])

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <div className='container' style={{backgroundColor: 'white', display: 'flex'}}>
        {/* <div style={{marginRight:"auto", marginLeft: "auto", paddingRight: "30px" ,paddingLeft: "30px"}}> */}
        <div style={{position: "relative", display: "flex", overflow: "visible", alignItems:'flex-start', width: "50%", marginRight: "20px", flexDirection:'column'}}>
            {plant.imageURLS && plant.imageURLS.map((c) => (
              <img src={c} style={{ display: "flex", flexDirection: "row",maxWidth: "25%" }} />
            ))
            }
           {/* { plant.imageURLS && <img src={plant.imageURLS[0]} style={{ display: "flex", flexDirection: "row",maxWidth: "25%" }} /> } */}
        </div>
        <div style={{flex: "1"}}>
          <div>
            <h1 className={styles.product_name}>{plant.name}</h1>
            <a className={styles.category_name}>{plant.type}</a>
            <div className={styles.top_margin}>
              <div className={styles.price_text}>$ {plant.price} USD</div>
            </div>
          </div>
          <div className={styles.top_margin}>
          {/* <div>ADD TO CART</div> */}
         <div style={{marginTop:'0px', marginBottom:'15px', marginRight: '0px', marginLeft: '0px'}}>
          <div className={styles.quantity_input}>
            <label htmlFor="quantity" className={styles.field_label}>Quantity</label>
         <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className={styles.quantity}/>
         </div>
         <button
           style={{ width: "100%", minHeight: '42px',color: "white", textTransform: 'uppercase', fontSize:'14px' }}
           onClick={() => handleAddToCart(plant.id, quantity)}
         >
           Add To Cart
         </button>
         <div style={{marginTop: '10px', color: '#707070', fontSize: '13px', textAlign: 'center'}}><div>Free Shipping &amp; Returns in the U.S.</div></div>
         </div>
          </div>
          <div>
                   {/* Accordions */}
         <div className={styles.top_margin}>
           {/* Description Accordion */}
           <div style={{ position: 'relative', marginTop: '15px' }}>

             <div className={styles.accordion} onClick={() => setIsActive(!isActive)} >
               <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', flexWrap: "no-wrap" }}>
                   <div className={styles.flex_no_wrap}><h6 className={`${styles.h6} ${styles.less_top_margin}`}>Description</h6>
                     <div className={styles.open_close_item}>{isActive ? '-' : '+'}</div>

                   </div>
                 </div>
               </div>
             </div>
             {isActive && <div className={styles.description}><p>{plant.description}</p></div>}
           </div>

           {/* CareGuide Accordion */}
           <div style={{ position: 'relative', marginTop: '15px' }}>
             <div className={styles.accordion} onClick={() => setcareguideIsActive(!careguideisActive)} >
               <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', flexWrap: "no-wrap" }}>
                   <div className={styles.flex_no_wrap}><h6 className={`${styles.h6} ${styles.less_top_margin}`}>Care Guide</h6>
                     <div className={styles.open_close_item}>{careguideisActive ? '-' : '+'}</div>
                   </div>
                 </div>
               </div>
            </div>
             {careguideisActive &&
              <div className={styles.w_richtext}>
                <p>
                  <strong>Plant Care</strong>
                  <br />
                  {plant.careguide.plantCare}
                </p>
                <p>
                  <strong>Sad Plant Signs</strong>
                  <br />
                  {plant.careguide.sadPlantSigns}
                </p>
              </div>}
          </div>
          {/* Shipping Accordion */}
          <div style={{ position: 'relative', marginTop: '15px' }}>
            <div className={styles.accordion} onClick={() => setshippingIsActive(!shippingisActive)} >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexWrap: "no-wrap" }}>
                  <div className={styles.flex_no_wrap}><h6 className={`${styles.h6} ${styles.less_top_margin}`}>Shipping</h6>
                    <div className={styles.open_close_item}>{shippingisActive ? '-' : '+'}</div>
                  </div>
                </div>
              </div>
            </div>
            {shippingisActive &&
              <div>
                <div className={styles.w_richtext}>
                  <p>
                    {plant.shipping.description}
                  </p>
                </div>
                <div className={styles.bottom_margin}>
                  <div className={styles.inline}>Weight (Oz):
                  </div>
                  <div className={styles.measure_text}>
                    {plant.shipping.weight}
                  </div>
                </div>
                <div className={styles.bottom_margin}>
                  <div className={styles.inline}>Width (In):
                  </div>
                  <div className={styles.measure_text}>
                    {plant.shipping.width}
                  </div>
                </div>
                <div className={styles.bottom_margin}>
                  <div className={styles.inline}>Height (In):
                  </div>
                  <div className={styles.measure_text}>
                    {plant.shipping.height}
                  </div>
                </div>
              </div>
            }
          </div>
          <div>


          </div>
        </div>
          </div>
            {/* {plant.imageURLS && plant.imageURLS.map((c) => (
              <img src={c} style={{ display: "flex", flexDirection: "row",maxWidth: "25%" }} />
            ))
            } */}
        </div>
      </div>
      <div className='container' style={{backgroundColor: 'lightgray', display: 'flex'}}>
        <div style={{marginRight:"auto", marginLeft: "auto", paddingRight: "30px" ,paddingLeft: "30px"}}>
        <h2 style={{textAlign: 'center'}}>Reviews</h2>
        <br/>
 <table>
   <thead>
   <tr>
     <th>Date</th>
     <th>About this product</th>
     </tr>

    </thead>
     <tbody>
   {
              plant.reviews && Object.keys(plant.reviews).map((key,i) => 
                <tr>
                  <td>{plant.reviews[key].date}</td>
                  <td><strong>{plant.reviews[key].title}</strong><br/>{plant.reviews[key].description}</td>
                </tr>

          )
}
</tbody>
</table>
            
        </div>
         <div style={{marginRight:"auto", marginLeft: "auto", paddingRight: "30px" ,paddingLeft: "30px"}}>
            <ReviewComponent plantID={params.plantID}/>
            
         </div>


       </div>
     </div>
  )
}

export default IndividualPlant
