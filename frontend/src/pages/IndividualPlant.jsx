import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import styles from "../styles/individualplants.module.css"
import axios from "axios"
import Accordion from "../components/Accordian";


const IndividualPlants = () => {
    const params = useParams()

    console.log(params)

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchData() {
            const id = params.plantID;
            setLoading(false)
        }
        fetchData()

        console.log('hi', fakeDataArray)
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div id="Top" className="wf-section">
        <div className="content-wrapper w-container">
            <div className="flex">
                <div className="featured-left">
                    <div className="sticky-navbar">
                        <div className="thumbnails-container">
                            <a href="#" className="thumbnail w-inline-block">
                                <img src={plant.imageURLS[0]} alt={plant.name} />
                            </a>
                            <a href="#" className="thumbnail w-inline-block">
                                <img src={plant.imageURLS[1]} alt={plant.name}/>
                            </a>
                        </div>
                        <div className='previews'>
                            <img src={plant.imageURLS[0]} alt={plant.name}/>
                        </div>
                     </div>
                </div>
                <div className='expand'>
                    <h1 className='product-name'>{plant.name}</h1>
                    <div>
                        <a href="/category/araceae" className="category-name">{plant.type}</a>
                    </div>
                    <div className='top-margin'>
                        <p>$ {plant.price} USD</p>
                    </div>
                    {/*Add to cart*/}
                {/* <input
                        type="text"
                        id="message"
                        name="message"
                        // onChange={handleChange}
                        value={quantity}
                    />
                        <button onClick={() => handleAddToCart(plant.id,quantity)}
                >
                    Add To Cart
                    /*}
                                
                </button>  */}
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
                    <div className='top-margin'>
                        <div className="accordion">
                            <div className="_100-percent-width">
                                <div
                                className="flex-no-wrap"
                                onClick={() => setIsActive(!isActive)}
                                >
                                <h6 className='h6 less-top-margin'>Description</h6>
                                <div className='open-close-item'>{isActive ? '-' : '+'}</div>
                                </div>
                                {isActive && <div className="description">{plant.description}</div>}
                            </div>
                        </div>
                        <CareGuideAccordion description={plant}/>
                        <Accordion description={plant}/>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
        // <div id="Top" className={styles["wf-section"]}>
        //     <div className={`${styles.content_wrapper} ${styles.w_container}`}>
        //         <div className={styles.flex}>
        //             {/* images part*/}
        //             {/*plant text*/}
        //             <div className={styles.expand}>
        //                 <div>
        //                     <h1 className={styles.product_name}>{fakeBodyDataArray.title}</h1>
        //                     <div>
        //                     <a href="/category/araceae" className={styles.category_name}>{fakeBodyDataArray.body}</a>
        //                     </div>
        //                     <div className={styles.top_margin}>
        //                         <div className={styles.price_text}>$&nbsp;79.00&nbsp;USD</div>
        //                     </div>
        //                     <div className={styles.top_margin}>
        //                         <div>
                               
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     </div>
        //     </div>
        //     </div>
        //related products

    );
}


export default IndividualPlants

