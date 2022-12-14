import homeStyles from "../styles/home.module.css";
import img from "../assets/homePic.png";
import useAuthStore from "../store/auth";

const Home = () => {

  const user = useAuthStore((state) => state.user);
  console.log("user after being set in state", user)
  return (
    <div className={homeStyles.home}>
      {/* <img src={img} alt="plant pic" id="myImage" /> */}
      <div className={homeStyles.flexContainer}>
        <div className={homeStyles.image} id={homeStyles.flexItem1}>
          <img src={img} alt="plant pic" id={homeStyles.myImage} />
        </div>
        <div className={homeStyles.title} id={homeStyles.flexItem2}>
          <h1>
            <em>tiny</em>
            <br></br>seeds
            <div className={homeStyles.description}>
              <br></br>
              <b>We love plants like you do</b>
              <p>tiny seeds is a modern plants e-commerce store.</p>
            </div>
            <button type="button" id={homeStyles.myButton}>
              Go Shopping
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
