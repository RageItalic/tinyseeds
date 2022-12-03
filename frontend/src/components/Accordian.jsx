import React, { useState } from 'react';


import styles from "../styles/individualplants.module.css"
const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.top_margin}>
        <div className={styles.accordion}>
            <div className={styles.accordion_trigger} onClick={() => setIsActive(!isActive)}>
                
                {isActive ? 
                <div className={styles.open_close_item}>
                    <img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5f154aff6ae56f2925175_Arrow-d.svg" width={17} alt="" className={styles.product_arrow} />
                </div>
                : <img src="https://assets.website-files.com/62d2e266e20c184da5836dab/62d5f154aff6ae56f2925175_Arrow-d.svg"  width={17} alt="" className={styles.product_arrow} />}
                <div className={styles._100_percent_width}>
                    <div className={styles.flex_no_wrap}>
                        <h6 className={`${styles.h6} ${styles.less_top_margin}`}>&nbsp;&nbsp;{title}<br /></h6>
                    </div>
                    </div>
                </div>
                <a href="#" className={`${styles.accordion_trigger} ${styles.w_inline_block}`} />
                    <div className={styles.description} style={{}}> 
                    {isActive && <p>{content}</p> }
                    </div>
                <div className="accordion-item">
                <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                {/* <div>{title}</div> */}
                {/* <div>{isActive ? '-' : '+'}</div> */}
                </div>
                {/* {isActive && <div className="accordion-content">{content}</div>} */}
            </div>
            </div>
            </div>
           


  
  );
};

export default Accordion;
