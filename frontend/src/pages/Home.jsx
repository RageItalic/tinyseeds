import homeStyles from "../styles/home.module.css";
import img from "../assets/homePic.png";
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div className={homeStyles.home}>
      {/* <img src={img} alt="plant pic" id="myImage" /> */}
      <div className={homeStyles.flexContainer}>
        <div className={homeStyles.image} id={homeStyles.flexItem1}>
          <img src={img} alt="plant pic" id={homeStyles.myImage} />
        </div>
        <div className={homeStyles.title} id={homeStyles.flexItem2}>
          <h1 style={{ color: "white" }}>
            <em>tiny</em>
            <br></br>seeds
            <div className={homeStyles.description}>
              <br></br>
              <b>We love plants like you do.</b>
              <p>tiny seeds is a modern plants e-commerce store.</p>
            </div>
            <Link to="/plants" >
             <button id={homeStyles.myButton}>Go Shopping</button>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
