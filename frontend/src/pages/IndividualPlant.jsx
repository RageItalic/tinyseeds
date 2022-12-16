
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewComponent from '../components/ReviewComponent';
import useCartStore from "../store/cart"
import { getPlant } from '../utils/helpers';
import styles from "../styles/individualplants.module.css"





const IndividualPlant = () => {
  const params = useParams();
  const [plant, setPlant] = useState("");
  const [loading, setLoading] = useState("");
  const addToCart = useCartStore(state => state.addToCart)
  const cart = useCartStore(state => state.cart)
  const [isActive, setIsActive] = useState(true);
  const [careguideisActive, setcareguideIsActive] = useState(false);
  const [shippingisActive, setshippingIsActive] = useState(false);
  const [reviewAdded, setreviewAdded] = useState(false);
  const [image, setImage] = useState();


  const changeImage = () => {
    let value = image;

    if (value === plant.imageURLS[0]) {
      setImage(plant.imageURLS[1]);
    } else {
      setImage(plant.imageURLS[0]);
    }
  };

  const handleAddToCart = (plantId) => {
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
    }
  }

  useEffect(() => {
    //store cart in localStorage every time it updates
    async function getFromDb() {
      let plants = await getPlant(params.plantID)
      console.log("TESTING", plants)
      setLoading(false)
      setPlant(plants)
      setImage(plants.imageURLS[0])

    }
    getFromDb()
    localStorage.setItem('cart', JSON.stringify(cart))

  }, [cart, reviewAdded])

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  const defaultThumbnailSrc = "https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg";
  // image = plant.imageURLS && plant.imageURLS[0];
  return (
    <div style={{ backgroundColor: 'white', paddingTop:'25px' }}>
      <div>
        <div className={styles.content_wrapper}>
          <div className={styles.flex}>
            <div className={styles.featured_left}>
              <div className={styles.sticky_navbar}>
                {console.log(image)}
                {
                  plant.imageURLS &&
                  <div>
                    <div className={styles.thumbnails_container}>
                      <a className={`${styles.thumbnail} ${styles.w_inline_block}`} onClick={changeImage}>
                        <img src={defaultThumbnailSrc} loading="lazy" alt="" />
                        <div style={{ backgroundImage: 'url(' + plant.imageURLS[0] + ')' }} className={styles.image_bg} />
                      </a>
                    </div><div className={styles.thumbnails_container}>
                      <a className={`${styles.thumbnail} ${styles.w_inline_block}`} onClick={changeImage}>
                        <img src={defaultThumbnailSrc} loading="lazy" alt="" />
                        <div style={{ backgroundImage: 'url(' + plant.imageURLS[1] + ')' }} className={styles.image_bg} />
                      </a>
                    </div>
                  </div>
                }
                <div className={styles.previews}>
                  <img src={plant.imageURLS > 0 ? plant.imageURLS[0] : image} alt={plant.name} />
                </div>
              </div>
            </div>
            <div className={styles.expand}>
              <div>
                <h1 className={styles.product_name}>{plant.name}</h1>
                <div>



                  <a href="/category/araceae" className={styles.category_name}>{plant.type}</a>

                </div>
                <div className={styles.top_margin}>
                  <div className={styles.price_text}>$ {plant.price} USD</div>
                </div>
                {/* Add to cart */}
                <div className={styles.top_margin}>
                  <div>
                    <button className={`${styles.w_commerce_commerceaddtocartbutton} ${styles.add_to_cart_button}`} onClick={() => handleAddToCart(plant.id)}>Add to Cart</button>
                    <div className={styles.center_text_notice}><div>Free Shipping &amp; Returns in the U.S.</div></div>
                  </div>
                </div>
              </div>

              {/* Accordion  */}
              <div className={styles.top_margin}>
                {/* Description Accordion */}
                <div className={styles.accordion}>
                  <div className={styles.accordion_trigger} onClick={() => setIsActive(!isActive)}>
                    <div className={styles.open_close_item} >
                      {
                        isActive ?
                          '-' :
                          '+'
                      }

                    </div>
                    <div className={styles._100_percent_width}>
                      <div className={styles.flex_no_wrap}>
                        <h6 className={`${styles.h6} ${styles.less_top_margin}`}>Description<br /></h6>
                      </div>
                    </div>
                  </div>
                  <a href="#" className={styles.accordion_trigger} />
                  {isActive && <div className={styles.description} style={{}}>
                    <p>{plant.description}</p>
                  </div>
                  }
                </div>
                {/* CareGuide Accordion */}
                <div className={styles.accordion}>
                  <div className={styles.accordion_trigger} onClick={() => setcareguideIsActive(!careguideisActive)} >
                    <div className={styles.open_close_item} >
                      {
                        careguideisActive ?
                          '-' :
                          '+'
                      }
                    </div>
                    <div className={styles._100_percent_width}>
                      <div className={styles.flex_no_wrap}>
                        <h6 className={`${styles.h6} ${styles.less_top_margin}`}>Care Guide<br /></h6>
                      </div>
                    </div>
                  </div>
                  {careguideisActive &&
                    <div className={styles.description}>
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


                {/* Shipping accordion */}
                <div className={styles.accordion}>
                  <div className={styles.accordion_trigger} onClick={() => setshippingIsActive(!shippingisActive)}>
                    <div className={styles.open_close_item} >
                      {
                        shippingisActive ?
                          '-' :
                          '+'
                      }

                    </div>
                    {/* Shipping */}
                    <div className={styles._100_percent_width}>
                      <div className={styles.flex_no_wrap}>
                        <h6 className={`${styles.h6} ${styles.less_top_margin}`}>Shipping<br /></h6>
                      </div>
                    </div>
                  </div>
                  <a href="#" className={styles.accordion_trigger} />
                  {shippingisActive && <div className={styles.description}>

                    <p>
                      {plant.shipping.description}
                    </p>
                    <div className={styles.bottom_margin}>
                      <div className={styles.inline}>Weight (Oz):</div>
                      <div className={styles.measure_text}>
                        {plant.shipping.weight}
                      </div>
                    </div>
                    <div className={styles.bottom_margin}>
                      <div className={styles.inline}>Width (In):</div>
                      <div className={styles.measure_text}>
                        {plant.shipping.width}
                      </div>
                    </div>
                    <div className={styles.bottom_margin}>
                      <div className={styles.inline}>Height (In):</div>
                      <div className={styles.measure_text}>
                        {plant.shipping.height}
                      </div>
                    </div>
                  </div>
                  }
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.content_wrapper} ${styles.w_container}`}>
        <div className={styles.flex}>
          <div style={{flex:1}}>
            <ReviewComponent plantID={params.plantID} reviewAdded={reviewAdded} setreviewAdded={setreviewAdded} />
          </div>
          <div style={{flex:1,marginLeft:'100px'}} className={styles.expand}>
            <h4>All Reviews</h4>



            {
            plant.reviews && Object.values(plant.reviews).map((review, i) => (
          //reviews.map((review) => (
        <div
          style={{ display: "flex", flexDirection: "column" }}
          key={review.id}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                alignItems: "baseline"
              }}
            >
              <h4>{review.title}</h4>
              
                
               {/* {review.date} */}
           
            </span>
            <h4>{review.ratingOutOf5}/5</h4>
          </div>
          <div>
          <p style={{ fontSize: "14px", color: "grey" }}>
          {review.date.split("T")[0]} </p>
            <p>{review.description}</p>
          </div>
        </div>
      ))}
      
            {/* <h1>See Reviews</h1> */}
    

          </div>
        </div>
      </div>
    </div>


  )
}

export default IndividualPlant


