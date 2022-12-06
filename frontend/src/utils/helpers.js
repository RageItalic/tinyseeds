import axios from "axios";
import { getDatabase, get, ref } from "firebase/database";

export async function getOrderHistory(userId) {
  const db = getDatabase();
  var orders = [];
  var resu = [];

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
            resu.push(node); //add to result array
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  });
  console.log(resu);
  return orders;
}
