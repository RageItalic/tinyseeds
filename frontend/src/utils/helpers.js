import axios from "axios";
import { getDatabase, get, ref } from "firebase/database";

/**
 * Get history from a user
 * @param {*} userId id of the user
 * @returns plants and quantity ordered by user with given id
 */
export async function getOrderHistory(userId) {
  const db = getDatabase();
  var orders = [];
  var result = [];

  //retrieve buyer
  try {
    const snapshot = await get(ref(db, `/purchaseOrders`));
    if (snapshot.exists()) {
      orders = snapshot.val().filter((node) => node.buyerID === userId);
    } else {
      console.log("no data found");
    }
  } catch (e) {
    console.error(e);
  }

  //compile all plants ordered by user into an array
  var plantsOrdered = [];
  orders.forEach((element) => {
    element.productsBought.forEach((plant) => {
      plantsOrdered.push(plant);
    });
  });

  //loop through plants to grab plant object for result
  plantsOrdered.forEach(async (plant) => {
    try {
      const snapshot = await get(ref(db, `/plants`)); //call to db to get all plants
      if (snapshot.exists()) {
        //get plants which have node is the plant from plants table, plant is the plant from purchaseOrder table
        snapshot.val().filter((node) => {
          if (node.id === plant.productId) {
            node["qty"] = plant.qty; //add quantity field to object
            result.push(node); //add to result array
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
  console.log(result);
  return orders;
}

/**
 * Get a single plant
 * @param {*} pid id of the plant you want to return
 * @returns the plant with given pid
 */
export async function getPlant(pid) {
  const db = getDatabase();
  var plant = null;

  try {
    const snapshot = await get(ref(db, `/plants`));
    if (snapshot.exists()) {
      plant = snapshot.val().filter((node) => node.id === pid);
    }
  } catch (e) {
    console.error(e);
  }
  console.log(plant);
  return plant; //plant not found
}
