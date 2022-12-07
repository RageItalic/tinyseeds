import axios from "axios";
import { getDatabase, get, ref } from "firebase/database";

/**
 * Returns an array of purchaseOrder objects. These objects have updated
 * productsBought variable which have modified plant objects in them. They are
 * basically plant objects but with an added qty variable which shows how many
 * of those items were ordered.
 * @param {*} userId id of the user
 * @returns plants and quantity ordered by user with given id
 */
export async function getOrderHistory(userId) {
  const db = getDatabase();
  var orders = [];

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

  orders.forEach((element) => {
    var plantsOrdered = [];
    var plants = [];

    element.productsBought.forEach((plant) => {
      plantsOrdered.push(plant);
    });

    //create plant objects with qty variable
    plantsOrdered.forEach(async (plantOrder) => {
      try {
        const snapshot = await get(ref(db, `/plants`)); //call to db to get all plants
        if (snapshot.exists()) {
          //get plants which have node is the plant from plants table, plant is the plant from purchaseOrder table
          snapshot.val().filter((plant) => {
            if (plant.id === plantOrder.productId) {
              plant["qty"] = plantOrder.qty; //add quantity field to object
              plants.push(plant); //add to result array
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    });

    element.productsBought = plants;
  });
  console.log(orders);
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
  return plant; //plant not found
}
