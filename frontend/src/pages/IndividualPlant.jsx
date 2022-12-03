import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styles from "../styles/individualplants.module.css"
import axios from "axios"
import Accordion from "../components/Accordian";


export const accordionData = [
    {
        title: 'Description',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
      laborum cupiditate possimus labore, hic temporibus velit dicta earum
      suscipit commodi eum enim atque at? Et perspiciatis dolore iure
      voluptatem.`
    },
    {
        title: 'Plant Care',
        content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
      reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
      quaerat iure quos dolorum accusantium ducimus in illum vero commodi
      pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
      quidem maiores doloremque est numquam praesentium eos voluptatem amet!
      Repudiandae, mollitia id reprehenderit a ab odit!`
    },
    {
        title: 'Shipping',
        content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`
    }
];


export const imageData = [
    {
        backgroundImage: "https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d3186175565884fbd80f07_1.jpg",
        image: 'https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg',
    },
    {
        backgroundImage: "https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d5faad2fe677c8b0c19374_Pre.jpg",
        image: 'https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d492944c1e6eeb3_Preview-thumbnail.jpg',
    },
    {
        backgroundImage: "https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611127976e60b41111dce_feey-ZnK3vfLzUg4-unsplash.jpg",
        image: 'https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg',
    },
    {
        backgroundImage: "https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611101701301d8dc0fe02_feey-0xoF2R50GOA-unsplash.jpg",
        image: 'https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg',
    },
    {
        backgroundImage: "https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6114aca41697527ed634f_feey-td4xk76-riQ-unsplash.jpg",
        image: 'https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg',
    },
    {
        backgroundImage: "https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6110e3f9316fc6a2b317b_feey-0_SdyvcFZqE-unsplash.jpg",
        image: 'https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg',
    },
    {
        backgroundImage: "https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d614341d090d7a44bcdb4d_feey-nnjlJby6X-4-unsplash.jpg",
        image: 'https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg',
    },
];

const Form = () => {
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 3000)
    }

    return(
        <div>
             {submitting &&
                <div>Submitting Form...</div>
            }
            <form data-node-type="commerce-add-to-cart-form" data-loading-text="Adding to cart..." className={styles.w_commerce_commerceaddtocartform} onSubmit={handleSubmit}>
                <div className={styles.quantity_input}>
                    <label htmlFor="quantity" className={styles.field_label}>Quantity</label>
                    <input type="number" pattern="^[0-9]+$" inputMode="numeric" id="quantity-0c85752a420946ff050b6d3a1d771aa7" name="commerce-add-to-cart-quantity-input" min={1} className={`${styles.w_commerce_commerceaddtocartquantityinput} ${styles.quantity}`} defaultValue={1} />
                </div>
                <input type="submit" data-node-type="commerce-add-to-cart-button" data-loading-text="Adding to cart..." defaultValue="Add to Cart" aria-busy="false" aria-haspopup="dialog" className={`${styles.w_commerce_commerceaddtocartbutton} ${styles.add_to_cart_button}`} /><div className={styles.center_text_notice}><div>Free Shipping &amp; Returns in the U.S.</div></div>
            </form>
        </div>
    );
}

const FormComponent = () => {
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        }, 3000)
    }

    return (
        <div>
            {submitting &&
                <div>Submitting Form...</div>
            }

            <form className={styles.w_commerce_commerceaddtocartform} onSubmit={handleSubmit}>
                <div className={styles.quantity_input}>
                    <label htmlFor="quantity" className={styles.field_label}>Quantity</label>
                    <input type="number" pattern="^[0-9]+$" inputMode="numeric" id="quantity" name="commerce-add-to-cart-quantity-input" min={1} className={`${styles.w_commerce_commerceaddtocartquantityinput} ${styles.quantity}`} defaultValue={1} />
                </div>
                <input type="submit" className={`${styles.w_commerce_commerceaddtocartbutton} ${styles.add_to_cart_button}`} />
                <div className={styles.center_text_notice}><div>Free Shipping &amp; Returns in the U.S.
                </div>
                </div>
            </form>
        </div>
    )
}

const ImagesComponent = () => {
    return (
        <div className={styles["featured-left"]}>
            <div className={styles["sticky-navbar"]}>
                <div className={styles["thumbnails-container"]}>
                    <a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}>
                        <img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                        {/*Center image*/}
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d3186175565884fbd80f07_1.jpg")' }} className={styles.image_bg} />
                    </a>

                    <a  href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d492944c1e6eeb3_Preview-thumbnail.jpg" loading="lazy" width={69} alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d5faad2fe677c8b0c19374_Pre.jpg")' }} className={styles.image_bg} /></a><a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611127976e60b41111dce_feey-ZnK3vfLzUg4-unsplash.jpg")' }} className={styles.image_bg} /></a><a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611101701301d8dc0fe02_feey-0xoF2R50GOA-unsplash.jpg")' }} className={styles.image_bg} /></a><a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6114aca41697527ed634f_feey-td4xk76-riQ-unsplash.jpg")' }} className={styles.image_bg} /></a><a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6110e3f9316fc6a2b317b_feey-0_SdyvcFZqE-unsplash.jpg")' }} className={styles.image_bg} /></a><a href="#" className={`${styles.thumbnail} ${styles.w_inline_block}`}><img src="https://assets.website-files.com/6053a1259d44f4eca4ad7ef4/6053d55d07cb850826279e78_Mini-thumbnail.jpg" loading="lazy" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d614341d090d7a44bcdb4d_feey-nnjlJby6X-4-unsplash.jpg")' }} className={styles.image_bg} /></a></div>

{/* <FormComponent/> */}


                <div className={styles.previews}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" sizes="100vw" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" alt="" />
                    <div className={styles.preview_item_2} style={{ display: 'none' }}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d5faad2fe677c8b0c19374_Pre.jpg")' }} className={styles.absolute_image} /></div>
                    <div className={styles.preview_item_3} style={{ display: 'none' }}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611127976e60b41111dce_feey-ZnK3vfLzUg4-unsplash.jpg")' }} className={styles.absolute_image} /></div>
                    <div className={styles.preview_item_4} style={{ display: 'none' }}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d611101701301d8dc0fe02_feey-0xoF2R50GOA-unsplash.jpg")' }} className={styles.absolute_image} /></div>
                    <div className={styles.preview_item_5} style={{ display: 'block' }}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6114aca41697527ed634f_feey-td4xk76-riQ-unsplash.jpg")' }} className={styles.absolute_image} />
                    </div>
                    <div className={styles.preview_item_6} style={{ display: 'none' }}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d6110e3f9316fc6a2b317b_feey-0_SdyvcFZqE-unsplash.jpg")' }} className={styles.absolute_image} /></div><div className={styles.preview_item_7} style={{ display: 'none' }}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                        <div style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d614341d090d7a44bcdb4d_feey-nnjlJby6X-4-unsplash.jpg")' }} className={styles.absolute_image} /></div><div className={styles.preview_item} style={{ display: 'none' }}><img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg" loading="lazy" srcSet="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-500.jpeg 500w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white-p-800.jpeg 800w, https://assets.website-files.com/62d2e266e20c184da5836dab/62d5ee8d3d49297d16e6eeb5_Bg-white.jpg 1004w" sizes="100vw" alt="" />
                        <div data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr.url%22%2C%22to%22%3A%22style.background-image%22%7D%5D" style={{ backgroundImage: 'url("https://assets.website-files.com/62d2fc5d5d3ddb4ccc824158/62d3186175565884fbd80f07_1.jpg")' }} className={styles.absolute_image} />
                    </div>
                </div>
            </div>
        </div>
    );
}



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

    return (
        <div id="Top" className={styles["wf-section"]}>
            <div className={`${styles.content_wrapper} ${styles.w_container}`}>
                <div className={styles.flex}>
                    {/* images part*/}
                    <ImagesComponent />
                    {/*plant text*/}
                    <div className={styles.expand}>
                        <div>
                            <h1 className={styles.product_name}>{fakeBodyDataArray.title}</h1>
                            <div>
                            <a href="/category/araceae" className={styles.category_name}>{fakeBodyDataArray.body}</a>
                            </div>
                            <div className={styles.top_margin}>
                                <div className={styles.price_text}>$&nbsp;79.00&nbsp;USD</div>
                            </div>
                            <div className={styles.top_margin}>
                                <div>
                                    <Form/>
                            {accordionData.map(({ title, content }) => (
                                <Accordion title={title} content={content} />
                 ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
        //related products

    );
}


export default IndividualPlants

