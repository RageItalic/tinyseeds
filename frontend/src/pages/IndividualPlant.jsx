import React from 'react'
import styles from "../styles/individualplants.module.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { getPlant } from "../utils/helpers";
import useCartStore from "../store/cart";

const IndividualPlant = () => {
  const params = useParams()
  // const addToCart = useCartStore(state => state.addToCart)
  // const cart = useCartStore(state => state.cart)
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState("")
  const [plant, setPlant] = useState("")
  const [isActive, setIsActive] = useState(null);
  const [careguideisActive, setcareguideIsActive] = useState(null);
  const [shippingisActive, setshippingIsActive] = useState(null);
  const addToCart = useCartStore(state => state.addToCart)
  const cart = useCartStore(state => state.cart)

  function handleChange(event) {
    console.log(event.target.value);
    setQuantity(event.target.value);
  }
  

  const handleAddToCart = (plantId,quantity) => {
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
            qty: quantity
        }
        console.log(newItem.qty);
        addToCart("NEW_ITEM", cart, newItem)

    } else {
        //same plant obj found in cart

        //update plant obj in cart to increase qty
        addToCart("UPDATE_INCREMENT_ITEM", cart, {}, plantWithIdIndex)
    }
}


  useEffect(() => {
    async function getFromDb() {
      let plants = await getPlant(params.plantID)
      console.log("TESTING", plants)
      setLoading(false)
      setPlant(plants)
    }
    getFromDb()
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={`${styles.content_wrapper} ${styles.w_container}`}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Image container */}
        <div className={styles.featured_left}>
            <div className={styles.sticky_navbar}>
              <div className={styles.previews}>
                {/* <img src={plant.imagesURLS[0]} alt={plant.name} style={{width:"50%", alignItems: "flex-start"}}/> */}
              </div>
            </div>
          </div>
          {/* End of image container */}
          {/* Description container */}
          <div style={{ flex: '1' }}>
            {/* Description + Add to cart */}
            {/* Description + price */}
            <div>
              <h1 className={styles.product_name}>{plant.name}</h1>
              <div>
                <a className={styles.category_name}>{plant.type}</a>
              </div>
            </div>
            <div style={{ position: 'relative', marginTop: '15px' }}>
              <div className={styles.price_text}>
                ${plant.price} USD
              </div>
            </div>
            {/* Add to cart */}
            <div style={{ position: 'relative', marginTop: '15px' }}>
              <div>
                {/* <form className={styles.add_to_form}> */}
                  <div className={styles.quantity_input}>
                    <label htmlFor='quantity' className={styles.field_label}>
                      Quantity
                    </label>
                    <input type="number" pattern="^[0-9]+$" min="1" value={quantity} name={quantity} className={styles.quantity} onChange={handleChange}>
                    </input>

                  </div>
                  <input type="submit" className={styles.add_to_cart_button} value="ADD TO CART" onClick={() => handleAddToCart(plant.id,quantity)}></input>
                  <div className={styles.center_text_notice}>
                    <div>Free Shipping &amp; Returns in the U.S.</div>
                  </div>
                {/* </form> */}
              </div>
            </div>
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
          </div>
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
                  <div className={styles.open_close_item}>{careguideisActive ? '-' : '+'}</div>
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
          {/* Reviews section */}
          <h3>Reviews</h3>
            

          {/* End of description container */}
      </div>
    </div>
  )

}

export default IndividualPlant
