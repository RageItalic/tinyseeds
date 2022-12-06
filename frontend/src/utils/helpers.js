import axios from "axios";
import { getDatabase, get, ref } from "firebase/database";

export async function getOrderHistory(userId) {
  const db = getDatabase();
  var orders = [];
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

  var resu = [];
  plantsOrdered.forEach(async (plant) => {
    try {
      const snapshot = await get(ref(db, `/plants`));
      if (snapshot.exists()) {
        snapshot.val().filter((node) => {
          if (node.id === plant.productId) {
            resu.push(node);
            node["qty"] = plant.qty;
            resu.push(node);
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
