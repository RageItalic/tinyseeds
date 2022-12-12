import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import useCartStore from "../store/cart"
import { addReview, getPlant } from '../utils/helpers'
import styles from "../styles/individualplants.module.css"

const mystyle = {
  // color: "white",
  // backgroundColor: "DodgerBlue",
  // padding: "10px",
  // fontFamily: "Arial"
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "white"
};

const flexItemA = {
  // color: "white",
  // backgroundColor: "DodgerBlue",
  // padding: "10px",
  // fontFamily: "Arial"
  marginLeft: "auto",
  flexGrow: "5"
};

const flexItemB = {
  // color: "white",
  // backgroundColor: "DodgerBlue",
  // padding: "10px",
  // fontFamily: "Arial"
  marginRight: "auto",
  flexGrow: "2"
};



const IndividualPlant = () => {
  const params = useParams();
  const addToCart = useCartStore(state => state.addToCart)
  const cart = useCartStore(state => state.cart)
  const [plant, setPlant] = useState("");
  const [loading, setLoading] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [careguideisActive, setcareguideIsActive] = useState(null);
  const [shippingisActive, setshippingIsActive] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (plantId, quantity) => {
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
      addToCart("NEW_ITEM", cart, newItem)
    } else {
      //same plant obj found in cart

      //update plant obj in cart to increase qty
      addToCart("UPDATE_QUANTITY_AMOUNT", cart, { quantity }, plantWithIdIndex)
    }
  }

  const handleAddReview = (plantId, quantity, description, ratingOutOf5, title) => {
    //if cart has plant with given id, just update qty and reset specific object on cart
    //else put in a new object
    let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
    console.log("review found?", plantWithIdIndex)

    if (plantWithIdIndex === -1) {
      const testReview = {
        id: review.id,
        value: {
          date: "2017-09-20T06:45:16 +04:00",
          description: description,
          id: reviewId,
          index: index,
          ratingOutOf5: ratingOutOf5,
          title: title,
        },
      };
      addReview(testReview, plantId)
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
    <div style={mystyle}>
      <div style={flexItemB}>
        {plant.imageURLS && plant.imageURLS.map((c) => (
          <img src={c} style={{ display: "flex", flexDirection: "column", maxWidth: "50%" }} />
        ))
        }
        {/* { plant.reviews.id && plant.reviews.id.map((c) => (
        <li>{c.id}</li>
       ))
        } */}
      </div>
      <div style={flexItemA}>
        <div>
          <h1 className={styles.product_name}>{plant.name}</h1>
          <a className={styles.category_name}>{plant.type}</a>
          <div className={styles.top_margin}>
            <div className={styles.price_text}>$ {plant.price} USD</div>
          </div>
        </div>
        {/* <div>ADD TO CART</div> */}
        <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button
          style={{ bottom: "5%", width: "25%", zIndex: "1", right: "2.5%", color: "white" }}
          onClick={() => handleAddToCart(plant.id, quantity)}
        >
          Add To Cart
        </button>
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
          </div>
          <div>
            <h1>Reviews</h1>
            

            {
         plant.reviews && Object.keys(plant.reviews).map((key,i) => 
         <div>
            <h2 key={i}>Title: {plant.reviews[key].title}</h2>
            <h2 key={i}>Description: {plant.reviews[key].description}</h2>
            <h2 key={i}>Date: {plant.reviews[key].date}</h2>
         </div>
     )
      } 
             
          </div>
        </div>



      </div>
    </div>





  )
}

export default IndividualPlant

// import React from 'react'
// import { useState, useEffect } from "react"
// import { Link, useParams } from 'react-router-dom'
// import useCartStore from "../store/cart"
// import { addReview, getPlant } from '../utils/helpers'
// import styles from "../styles/individualplants.module.css"

// const mystyle = {
//   // color: "white",
//   // backgroundColor: "DodgerBlue",
//   // padding: "10px",
//   // fontFamily: "Arial"
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   backgroundColor: "white"
// };

// const flexItemA = {
//   // color: "white",
//   // backgroundColor: "DodgerBlue",
//   // padding: "10px",
//   // fontFamily: "Arial"
//   marginLeft: "auto",
//   flexGrow: "5"
// };

// const flexItemB = {
//   // color: "white",
//   // backgroundColor: "DodgerBlue",
//   // padding: "10px",
//   // fontFamily: "Arial"
//   marginRight: "auto",
//   flexGrow: "2"
// };



// const IndividualPlant = () => {
//   const params = useParams();
//   const addToCart = useCartStore(state => state.addToCart)
//   const cart = useCartStore(state => state.cart)
//   const [plant, setPlant] = useState("");
//   const [loading, setLoading] = useState("");
//   const [isActive, setIsActive] = useState(null);
//   const [careguideisActive, setcareguideIsActive] = useState(null);
//   const [shippingisActive, setshippingIsActive] = useState(null);
//   const [quantity, setQuantity] = useState(0);

//   const handleAddToCart = (plantId, quantity) => {
//     //if cart has plant with given id, just update qty and reset specific object on cart
//     //else put in a new object
//     let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
//     console.log("plant found?", plantWithIdIndex)

//     if (plantWithIdIndex === -1) {
//       const newItem = {
//         id: plant.id,
//         name: plant.name,
//         price: plant.price,
//         stripePriceId: plant.stripePriceId,
//         mainImg: plant.imageURLS[0],
//         capacityAvailable: plant.capacityAvailable,
//         qty: quantity
//       }
//       addToCart("NEW_ITEM", cart, newItem)
//     } else {
//       //same plant obj found in cart

//       //update plant obj in cart to increase qty
//       addToCart("UPDATE_QUANTITY_AMOUNT", cart, { quantity }, plantWithIdIndex)
//     }
//   }

//   const handleAddReview = (plantId, quantity, description, ratingOutOf5, title) => {
//     //if cart has plant with given id, just update qty and reset specific object on cart
//     //else put in a new object
//     let plantWithIdIndex = cart.findIndex(plant => plant.id === plantId)
//     console.log("review found?", plantWithIdIndex)

//     if (plantWithIdIndex === -1) {
//       const testReview = {
//         id: review.id,
//         value: {
//           date: "2017-09-20T06:45:16 +04:00",
//           description: description,
//           id: reviewId,
//           index: index,
//           ratingOutOf5: ratingOutOf5,
//           title: title,
//         },
//       };
//       addReview(testReview, plantId)
//     }
//   }

//   useEffect(() => {
//     //store cart in localStorage every time it updates
//     async function getFromDb() {
//       let plants = await getPlant(params.plantID)
//       console.log("TESTING", plants)
//       setLoading(false)
//       setPlant(plants)
//     }
//     getFromDb()
//     localStorage.setItem('cart', JSON.stringify(cart))

//   }, [cart])

//   if (loading) {
//     return (
//       <div>Loading...</div>
//     )
//   }

//   return (


//     <div>
//       <p>Hello</p>
//       {
//          plant.reviews && Object.keys(plant.reviews).map((key,i) => 
//          <div>
//             <h2 key={i}>Title: {plant.reviews[key].title}</h2>
//             <h2 key={i}>Description: {plant.reviews[key].description}</h2>
//             <h2 key={i}>Description: {plant.reviews[key].date}</h2>
//          </div>
//      )
//       } 
//        {/* {
//         plant.reviews && Object.keys(plant.reviews).map((key) => {
//           <div>
//                    {console.log(key + " " + plant.reviews[key].description)}

//           </div>
//         })
//       }  */}
//     </div>





//   )
// }

// export default IndividualPlant

