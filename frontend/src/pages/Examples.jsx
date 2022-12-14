import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import {
  getOrderHistory,
  getPlant,
  addReview,
  saveOrder,
  getUser,
  getAllPlants,
  getAllPlantsSold,
  getMonthRevenue,
  getAllTimeRevenue,
} from "../utils/helpers";

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
    let response = await axios.post(
      "http://localhost:8080/create-checkout-session"
    );
    console.log("look here ", response.data);
    window.location.replace(response.data.url);
  } catch (e) {
    console.error("Something went wrong with post request", e);
    console.log("Make sure the backend is runnning!");
  }
};

const Examples = () => {
  const [count, setCount] = useState(0);
  // console.log(`This is a review ${reviewId}`);
  let reviewId = nanoid();
  const testReview = {
    id: reviewId,
    value: {
      date: "2017-09-20T06:45:16 +04:00", 
      // date js date function (get UTC date)
      description:
        "sunt commodo nostrud irure nostrud voluptate culpa nostrud aliqua laboris laboris incididunt do nisi dolore fugiat elit nisi pariatur duis laboris et Lorem enim exercitation aliqua do mollit nisi ea in in veniam et proident labore cupidatat enim fugiat Lorem",
     //user 
        id: reviewId,
      index: "3",
      ratingOutOf5: "2.5",
      //from user
      title: "look at this",
      //from user
    },
  };

  let orderId = nanoid();
  let purchaseId = nanoid();
  console.log(`OrderID=${orderId}`);
  const testPurchaseOrder = {
    id: orderId,
    value: {
      id: orderId,
      buyerID: "fvc63b",
      date: "2025-02-24T07:39:45",
      productsBought: {
        [purchaseId]: {
          id: purchaseId,
          productId: "kz8i5h",
          qty: "1",
        },
      },
      status: "FAILURE",
    },
  };

  const filter = {
    type: "Cactus",
    featured: false,
  };

  useEffect(() => {
    // exampleGet();
    // examplePost();

    async function test() {
      let data = await getOrderHistory("fvc63b")
      console.log("LUKE HERE", data)
    }
    test()

    // console.log("LUKE here ", async function () {});
    // getPlant("oldrle");
    // addReview(testReview, "oldrle"); //DO NOT UNCOMMENT UNLESS YOUR NAME IS PAUL OR PARTH
    // saveOrder(testPurchaseOrder);  //DO NOT UNCOMMENT UNLESS YOUR NAME IS PAUL OR PARTH
    // getUser("lumcva");
    // getAllPlants(filter);
    // getAllPlantsSold(4, 2022);
    getMonthRevenue(4, 2022);
    // getAllTimeRevenue();
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
