import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// import "../styles/individualplants.css";
import styles from "../styles/individualplants.module.css"
import axios from "axios"


// const getFakeData = async () => {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
//     //https://jsonplaceholder.typicode.com/albums/1/photos
//     return response.data
// }

const IndividualPlants = () => {
    const params = useParams()

    console.log(params)

    const [loading, setLoading] = useState(true)
    const [fakeDataArray, setFakeDataArray] = useState(null)
    const [fakeBodyDataArray, setFakeBodyData] = useState(null)

    useEffect(() => {

        async function fetchData() {
            const id = params.plantID;
            //onst data = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const imagedata = await axios.get(` https://jsonplaceholder.typicode.com/photos/${params.plantID}`)
            .then((response) => {
                 console.log(response.data);
                 setFakeDataArray(response.data);
              });
              const textData = await axios.get(` https://jsonplaceholder.typicode.com/posts/${params.plantID}`)
              .then((response) => {
                   console.log(response.data);
                   setFakeBodyData(response.data);
                });
            //setFakeDataArray(data)
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

    return(
        <div id="Top" className={styles["wf-section"]}>
            <div className={`${styles.content_wrapper} ${styles.w_container}`}>
                <div className={styles.flex}>
                    <div className={styles["featured-left"]}>
                        <div className={styles["sticky-navbar"]}>
                            <div className={styles["thumbnails-container"]}>
                                <a data-wf-sku-conditions="%7B%22condition%22%3A%7B%22fields%22%3A%7B%22default-sku%3Amain-image%22%3A%7B%22exists%22%3A%22yes%22%2C%22type%22%3A%22ImageRef%22%7D%7D%7D%2C%22timezone%22%3A%22America%2FMexico_City%22%7D" data-w-id="d0b994f8-8458-68db-ae24-2caefb64af52" href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}>
                                    <img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                                    {/*Center image*/}
                                    <div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr.url%22%2C%22to%22%3A%22style.background-image%22%7D%5D" style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d3186175565884fbd80f07_1.jpg")'}} className={styles.image_bg} /></a><a data-w-id="d0b994f8-8458-68db-ae24-2caefb64af55" href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d492944c1e6eeb3_Preview-thumbnail.jpg" loading="lazy" width={69} alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d5faad2fe677c8b0c19374_Pre.jpg")'}} className={styles.image_bg} /></a><a data-w-id="d0b994f8-8458-68db-ae24-2caefb64af58" href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611127976e60b41111dce_feey-ZnK3vfLzUg4-unsplash.jpg")'}} className={styles.image_bg} /></a><a data-w-id="d0b994f8-8458-68db-ae24-2caefb64af5b" href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611101701301d8dc0fe02_feey-0xoF2R50GOA-unsplash.jpg")'}} className={styles.image_bg} /></a><a data-w-id="d0b994f8-8458-68db-ae24-2caefb64af5e" href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6114aca41697527ed634f_feey-td4xk76-riQ-unsplash.jpg")'}} className={styles.image_bg} /></a><a data-w-id="d0b994f8-8458-68db-ae24-2caefb64af61" href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6110e3f9316fc6a2b317b_feey-0_SdyvcFZqE-unsplash.jpg")'}} className={styles.image_bg} /></a><a data-w-id="d0b994f8-8458-68db-ae24-2caefb64af64" href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d614341d090d7a44bcdb4d_feey-nnjlJby6X-4-unsplash.jpg")'}} className={styles.image_bg} /></a></div>
                                    <div className={styles.previews}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" sizes="100vw" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" alt="" />
                                    <div className={styles.preview_item_2} style={{display: 'none'}}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d5faad2fe677c8b0c19374_Pre.jpg")'}} className={styles.absolute_image} /></div>
                                    <div className={styles.preview_item_3} style={{display: 'none'}}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611127976e60b41111dce_feey-ZnK3vfLzUg4-unsplash.jpg")'}} className={styles.absolute_image} /></div>
                                    <div className={styles.preview_item_4} style={{display: 'none'}}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611101701301d8dc0fe02_feey-0xoF2R50GOA-unsplash.jpg")'}} className={styles.absolute_image} /></div>
                                    <div className={styles.preview_item_5} style={{display: 'block'}}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                                     <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6114aca41697527ed634f_feey-td4xk76-riQ-unsplash.jpg")'}} className={styles.absolute_image} /> 
                                    </div>
                                    <div className={styles.preview_item_6} style={{display: 'none'}}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6110e3f9316fc6a2b317b_feey-0_SdyvcFZqE-unsplash.jpg")'}} className={styles.absolute_image} /></div><div className={styles.preview_item_7} style={{display: 'none'}}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                                    <div style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d614341d090d7a44bcdb4d_feey-nnjlJby6X-4-unsplash.jpg")'}} className={styles.absolute_image} /></div><div className={styles.preview_item} style={{display: 'none'}}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                                    <div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr.url%22%2C%22to%22%3A%22style.background-image%22%7D%5D" style={{backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d3186175565884fbd80f07_1.jpg")'}} className={styles.absolute_image} />
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    {/*plant text*/}
                                    <div className={styles.expand}>
                                        <div>
                                            <h1 className={styles.product_name}>{fakeBodyDataArray.title}</h1>
                                        <div>
                                            <div className="w-dyn-list">
                                                <div role="list" className="w-dyn-items">
                                                    <div role="listitem" className="w-dyn-item">
                                                        <a href="/category/araceae" className={styles.category_name}>{fakeBodyDataArray.body}</a>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        <div className={styles.top_margin}>
                                                            <div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D" className={styles.price_text}>$&nbsp;79.00&nbsp;USD</div>
                                                        {/* <div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_compare_at_price_7dr10dr%22%2C%22to%22%3A%22innerHTML%22%7D%5D" className="compare-at-price">$&nbsp;99.00&nbsp;USD</div> */}
                                                        </div>
                                                        <div className={styles.top_margin}><div><form data-node-type="commerce-add-to-cart-form" data-commerce-sku-id="62d3186449432bef3eff7ffe" data-loading-text="Adding to cart..." data-commerce-product-id="62d318630e07ab7d15cead2e" className={styles.w_commerce_commerceaddtocartform}>
                                                            <div className={styles.quantity_input}><label htmlFor="quantity-0c85752a420946ff050b6d3a1d771aa-8" className={styles.field_label}>Quantity</label><input type="number" pattern="^[0-9]+$" inputMode="numeric" id="quantity-0c85752a420946ff050b6d3a1d771aa7" name="commerce-add-to-cart-quantity-input" min={1} className={`${styles.w_commerce_commerceaddtocartquantityinput} ${styles.quantity}`} defaultValue={1} /></div>
                                                            <input type="submit" data-node-type="commerce-add-to-cart-button" data-loading-text="Adding to cart..." defaultValue="Add to Cart" aria-busy="false" aria-haspopup="dialog" className={`${styles.w_commerce_commerceaddtocartbutton} ${styles.add_to_cart_button}`} /><div className={styles.center_text_notice}><div>Free Shipping &amp; Returns in the U.S.</div></div></form>
                                                            <div style={{display: 'none'}} className={`$(styles.w-commerce-commerceaddtocartoutofstock} $(styles.out_of_stock)`}>
                                                                <div>This product is out of stock :(</div></div>
                                                                <div data-node-type="commerce-add-to-cart-error" style={{display: 'none'}} className="w-commerce-commerceaddtocarterror error-shop-message">
                                                                    <div data-node-type="commerce-add-to-cart-error" data-w-add-to-cart-quantity-error="Product is not available in this quantity." data-w-add-to-cart-general-error="Something went wrong when adding this item to the cart." data-w-add-to-cart-mixed-cart-error="You can’t purchase another product with a subscription." data-w-add-to-cart-buy-now-error="Something went wrong when trying to purchase this item." data-w-add-to-cart-checkout-disabled-error="Checkout is disabled on this site." data-w-add-to-cart-select-all-options-error="Please select an option in each set.">Product is not available in this quantity.</div></div></div></div></div>
                                                                    <div className={styles.top_margin}><div className={styles.accordion}><div data-w-id="d0b994f8-8458-68db-ae24-2caefb64afa0" className={styles.accordion_trigger}>
                                                                        <div className={styles.open_close_item}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5f154aff6ae56f2925175_Arrow-d.svg" width={17} style={{transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}} alt="" className={styles.product_arrow} /></div>
                                                                        <div className={styles._100_percent_width}>
                                                                            <div className={styles.flex_no_wrap}>
                                                                                <h6 className={`${styles.h6} ${styles.less_top_margin}`}>Description<br /></h6></div></div></div><a href="#" data-w-id="d0b994f8-8458-68db-ae24-2caefb64afa8" className={`${styles.accordion_trigger} ${styles.w_inline_block}`} /> 
                                                                            <div className={styles.description} style={{}}>
                                                                                {/* <p>Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands.</p> */}
                                                                                <p>{fakeBodyDataArray.body}</p>
                                                                                </div></div>  
                                                                                {/* className={`${styles.h6} ${styles.less_top_margin}`} */}                                                                                 
                                                                                
                                                                            <div className={styles.accordion}><div data-w-id="d0b994f8-8458-68db-ae24-2caefb64afb8" className={styles.accordion_trigger}>
                                                                                <div className={styles.open_close_item}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5f154aff6ae56f2925175_Arrow-d.svg" width={17} style={{transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}} alt="" className="product-arrow" /></div>
                                                                                <div className={styles._100_percent_width}><div className={styles.flex_no_wrap}><h6 className={`${styles.h6} ${styles.less_top_margin}`}>Care Guide<br /></h6></div></div></div><a href="#" data-w-id="d0b994f8-8458-68db-ae24-2caefb64afc0" className={`${styles.accordion_trigger} ${styles.w_inline_block}`} /><div style={{height: '0px'}} className={styles.accordion_item}>
                                                                                    <div className={styles.w_richtext}>
                                                                                        <p><strong>Plant Care<br /></strong>Thrives in brilliant circuitous to medium light.</p><p>Water each 1 fourteen days, permitting soil to dry out between waterings. Hope to water all the more frequently in more splendid light and once in a while in lower light. </p>
                                                                                    <p>Monsteras can profit from sifted water or leaving water through for the time being before using.</p><p>The Monstera is well known for its regular leaf openings, or fenestrations. The openings are estimated to augment sun catch by expanding the spread of the leaf while diminishing the mass of leaf cells to support.</p><p><strong>Sad Plant Signs</strong></p><p><strong>‍</strong>Leaves becoming brown and fresh at the edges: Thirsty plant, underwatered, or high salt form up</p><p>Wilting plant, dry preparing blend: Underwatered, or pot-boundYellowing leaves or dark stems, wet preparing blend: Overwatered</p></div></div></div><div className={styles.accordion}><div data-w-id="d0b994f8-8458-68db-ae24-2caefb64afd0" className={styles.accordion_trigger}><div className={styles.open_close_item}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5f154aff6ae56f2925175_Arrow-d.svg" width={17} style={{transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}} alt="" className="product-arrow" /></div><div className="styles._100-percent_width">
                                                                                        <div className={styles.flex_no_wrap}><h6 className={`${styles.h6} ${styles.less_top_margin}`}>Shipping<br /></h6></div></div></div><a href="#" data-w-id="d0b994f8-8458-68db-ae24-2caefb64afd8" className={`${styles.accordion_trigger} ${styles.w_inline_block}`} /><div style={{height: '0px'}} className={styles.accordion_item}><div className={styles.w_richtext}>
                                                                                        <p>Plants is committed to reducing its environmental footprint. Nearly all packages ship via UPS® carbon neutral shipping. This means we (not you) pay a contractual rate per package that ensures we offset our shipping footprint and reduce our annual emissions as a company.</p></div>
                                                                                        <div data-wf-sku-conditions="%7B%22condition%22%3A%7B%22fields%22%3A%7B%22default-sku%3Aweight%22%3A%7B%22exists%22%3A%22yes%22%2C%22type%22%3A%22Number%22%7D%7D%7D%2C%22timezone%22%3A%22America%2FMexico_City%22%7D" className={styles.bottom_margin}><div className={styles.inline}>Weight (Oz):</div><div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_weight_%22%2C%22to%22%3A%22innerHTML%22%7D%5D" className={styles.measure_text}>10</div></div>
                                                                                        <div data-wf-sku-conditions="%7B%22condition%22%3A%7B%22fields%22%3A%7B%22default-sku%3Awidth%22%3A%7B%22exists%22%3A%22yes%22%2C%22type%22%3A%22Number%22%7D%7D%7D%2C%22timezone%22%3A%22America%2FMexico_City%22%7D" className={styles.bottom_margin}><div className={styles.inline}>Width (In):</div><div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_width_%22%2C%22to%22%3A%22innerHTML%22%7D%5D" className={styles.measure_text}>8</div></div>
                                                                                        <div data-wf-sku-conditions="%7B%22condition%22%3A%7B%22fields%22%3A%7B%22default-sku%3Aheight%22%3A%7B%22exists%22%3A%22yes%22%2C%22type%22%3A%22Number%22%7D%7D%7D%2C%22timezone%22%3A%22America%2FMexico_City%22%7D" className={styles.bottom_margin}><div className={styles.inline}>Height (In):</div><div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_height_%22%2C%22to%22%3A%22innerHTML%22%7D%5D" className={styles.measure_text}>8</div></div><div data-wf-sku-conditions="%7B%22condition%22%3A%7B%22fields%22%3A%7B%22default-sku%3Alength%22%3A%7B%22exists%22%3A%22yes%22%2C%22type%22%3A%22Number%22%7D%7D%7D%2C%22timezone%22%3A%22America%2FMexico_City%22%7D" className={styles.bottom_margin}>
                                                                                            <div className={styles.inline}>Length (In):</div><div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_length_%22%2C%22to%22%3A%22innerHTML%22%7D%5D" className={styles.measure_text}>10
                                                                                            </div></div></div></div></div></div></div></div></div>
        //related products

    );
}


export default IndividualPlants

