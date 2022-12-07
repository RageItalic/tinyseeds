import { useState, useEffect } from "react";
import axios from "axios";
import { getOrderHistory, getPlant, addReview } from "../utils/helpers";

const exampleGet = async () => {
  try {
    let response = await axios.get("http://localhost:8080/");
    console.log("Result from get request: ", response.data);
  } catch (e) {
    console.error("Something went wrong with get request", error);
    console.log("Make sure the backend is runnning!");
  }
};

const examplePost = async () => {
  let dataHolder = {
    name: "parth",
    age: 24,
    poopsDaily: true,
    favFoods: ["Pizza", "Tacos"],
  };

  try {
    let response = await axios.post("http://localhost:8080/getOrderHistory");
    console.log("look here ", response.data);
    window.location.replace(response.data.url);
  } catch (e) {
    console.error("Something went wrong with post request", e);
    console.log("Make sure the backend is runnning!");
  }
};

const Examples = () => {
  const [count, setCount] = useState(0);
  const testReview = {
    date: "2017-09-20T06:45:16 +04:00",
    description:
      "sunt commodo nostrud irure nostrud voluptate culpa nostrud aliqua laboris laboris incididunt do nisi dolore fugiat elit nisi pariatur duis laboris et Lorem enim exercitation aliqua do mollit nisi ea in in veniam et proident labore cupidatat enim fugiat Lorem",
    id: "638ade624068c0e123456789",
  };

  useEffect(() => {
    // exampleGet();
    // examplePost();
    getOrderHistory("fvc63b");
    getPlant("oldrle");
  }, []);

  return (
    <div>
      <h1>React Examples Page</h1>
      <p>Open up the console to see get and post examples</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p onClick={() => examplePost()}>
          click here and then look at console for example post request
        </p>
      </div>
    </div>
  );
};

export default Examples;
