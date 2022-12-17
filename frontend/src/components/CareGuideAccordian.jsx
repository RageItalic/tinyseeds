import React, { useState } from 'react';


import styles from "../styles/individualplants.module.css"
// const Accordion = ({ description, content }) => {
    const CareGuideAccordion = ({description}) => {

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.accordion}>
        <div className={styles._100_percent_width}>
            <div
            className={styles.flex_no_wrap}
            onClick={() => setIsActive(!isActive)}
            >
            <h6 className={`${styles.h6} ${styles.less_top_margin}`}>Care Guide</h6>
            <div className={`${styles.accordion_trigger} ${styles.w_inline_block}`}>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && 
            // <div className="description">
            //     {description.description}
            //     </div>
            <div 
            // style="width: 630px;" 
            className={styles.accordion_item}>
                <div className={styles.w_richtext}>
                    <strong>Plant Care</strong>
                    <p>{description.shipping.description}</p>
                    <strong>Sad Plant Signs</strong>
                    <p>{description.shipping.description}</p>
                </div>
               
            </div>
                }
        </div>
    </div>
           


  
  );
};

export default CareGuideAccordion;


