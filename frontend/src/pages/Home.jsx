import "../styles/home.css";
import img from "../assets/homeImage.png";

const Home = () => {
  return (
    <div className="home">
      {/* <img src={img} alt="plant pic" id="myImage" /> */}
      <div className="image">
        <img src={img} alt="plant pic" id="myImage" />
      </div>
      <div className="title">
        <h1>
          <em>tiny</em>
          <br></br>seeds
        </h1>
      </div>
      <div className="description">
        <p>
          <b>We love plants like you do</b>
          <br></br>
          tiny seeds is a modern <br></br> plants e-commerce store.
        </p>
      </div>

      <div className="button">
        <button type="button" id="myButton">
          Go Shopping
        </button>
      </div>
    </div>
  );
};

export default Home;
