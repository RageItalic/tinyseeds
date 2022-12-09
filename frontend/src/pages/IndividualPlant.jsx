import { useState, useEffect,useRef } from "react"
import { useParams } from "react-router-dom"
import styles from "../styles/individualplants.module.css"
//import axios from "axios"
// import Accordion from "../components/Accordian";
import { getPlant } from "../utils/helpers";
import "../styles/individualplants.css";
import useCartStore from "../store/cart";



const IndividualPlant = () => {
    const params = useParams()
    const addToCart = useCartStore(state => state.addToCart)
    const cart = useCartStore(state => state.cart)
    const [quantity,setQuantity] = useState("");
    const [loading,setLoading] = useState("")
    // const [inputValue, setInputValue] = useState("");
    // const previousInputValue = useRef("");

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
            addToCart("NEW_ITEM", cart, newItem)
        } else {
            //same plant obj found in cart
            
            //update plant obj in cart to increase qty
            addToCart("UPDATE_INCREMENT_ITEM", cart, {}, plantWithIdIndex)
        }
    }

  useEffect(() => {
    async function getFromDb () {
            let plants = await getPlant(params.plantID)
            console.log("TESTING", plant)
            setLoading(false)
            setPlant(plants[0])
        }
        getFromDb()
  }, []);

  if (loading) {
    return (
        <div>Loading...</div>
    )
}

    return(
        <div id="Top" className={styles["wf-section"]}>
            <div className={`${styles.content_wrapper} ${styles.w_container}`}>
                <div className={styles.flex}>
                    <div className={styles["featured-left"]}>
                        <div className={styles["sticky-navbar"]}>
                            <div className={styles["thumbnails-container"]}>
                                <a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}>
                                    <img src={plant.imageURLS[0]} alt={plant.name} />
                                </a>
                                <a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}>
                                    <img src={plant.imageURLS[1]} alt={plant.name}/>
                                </a>
                            </div>
                            <div className={styles.previews}>
                                <img src={plant.imageURLS[0]} alt={plant.name}/>
                            </div>
                         </div>
                    </div>
                    <div className={styles.expand}>
                    <h1 className={styles.product_name}>{plant.name}</h1>
                        <div>
                            <a href="/category/araceae" className={styles.category_name}>{plant.type}</a>
                        </div>
                        <div className={styles.top_margin}>
                            <p>$ {plant.price} USD</p>
                        </div>
                        {/*Add to cart*/}
                    <input
                            type="text"
                            id="message"
                            name="message"
                            onChange={handleChange}
                            value={quantity}
                        />
                            <button onClick={() => handleAddToCart(plant.id,quantity)}
                    >
                        Add To Cart
                        
                                    
                    </button> 
                    {/* <div className={styles.w_commerce_commerceaddtocartform}>
                <div className={styles.quantity_input}>
                    <label htmlFor="quantity" className={styles.field_label}>Quantity</label>
                  
                    {/* <input type="number" pattern="^[0-9]+$" inputMode="numeric" id="quantity" name="commerce-add-to-cart-quantity-input" min={1}  value={quantity} className={`${styles.w_commerce_commerceaddtocartquantityinput} ${styles.quantity}`} defaultValue={1} /> */}
               {/*} </div>
                <input type="submit" className={`${styles.w_commerce_commerceaddtocartbutton} ${styles.add_to_cart_button}`} onClick={() => handleAddToCart(plant.id,quantity)}/>
                <div className={styles.center_text_notice}><div>Free Shipping &amp; Returns in the U.S.
                </div>
                </div>
            </div> */}

                        {/*Accordian*/}
                        <div className={styles.top_margin}>
                            {params.plantID}
                            <div className={styles.accordion}>
                                <div className={styles._100_percent_width}>
                                    <div
                                    className={styles.flex_no_wrap}
                                    onClick={() => setIsActive(!isActive)}
                                    >
                                    <h6 className={`${styles.h6} ${styles.less_top_margin}`}>Description</h6>
                                    <div className={styles.open_close_item}>{isActive ? '-' : '+'}</div>
                                    </div>
                                    {isActive && <div className={styles.description}>{plant.description}</div>}
                                </div>
                            </div>
                            <CareGuideAccordion description={plant}/>
                            <Accordion description={plant}/>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndividualPlant
