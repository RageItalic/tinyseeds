import axios from "axios";
import { getDatabase, get, ref } from "firebase/database";

/**
 * Returns an array of purchaseOrder objects. These objects have updated
 * productsBought variable which have modified plant objects in them. They are
 * basically plant objects but with an added qty variable which shows how many
 * of those items were ordered.
 * @param {*} userId id of the user
 * @returns Order object containing plants and
 */
export async function getOrderHistory(userId) {
  const db = getDatabase();
  var orders = [];

  //retrieve buyer
  try {
    //find buyer with id = userId
    const snapshot = await get(ref(db, `/purchaseOrders`)); //O(n)
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        //check if buyer is the same, if yes add order to orders array
        if (child.val().buyerID == userId) {
          orders.push(child.val());
        }
      });
    } else {
      console.log("no data found");
    }
  } catch (e) {
    console.error(e);
  }

  //process orders by converting productsBought array into modified plant objects
  orders.forEach((order) => {
    let plantsOrdered = [];
    let plantOrders = Object.values(order.productsBought); //retrieves the productsBought map and converts into an array so we can use foreach()

    plantOrders.forEach(async (plantOrder) => {
      try {
        const snapshot = await get(ref(db, `/plants/${plantOrder.productId}`)); //get all plants with given plant id O(1)
        let plant = snapshot.val();
        plant["qty"] = plantOrder.qty;
        plantsOrdered.push(plant);
      } catch (e) {
        console.error(e);
      }
    });

    order.productsBought = plantsOrdered;
  });
  return orders;
}

/**
 * Get a single plant
 * @param {*} pid id of the plant you want to return
 * @returns The plant with given pid, or null if it doesn't exist
 */
export async function getPlant(pid) {
  const db = getDatabase();
  let plant = null;

  try {
    const snapshot = await get(ref(db, `/plants/${pid}`)); //O(1)
    if (snapshot.exists()) {
      plant = snapshot.val();
    } else {
      console.log("Plant does not exist!");
    }
  } catch (e) {
    console.error(e);
  }
  return plant;
}
