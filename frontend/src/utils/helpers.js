import axios from "axios";
import {
  getDatabase,
  get,
  ref,
  orderByChild,
  equalTo,
} from "firebase/database";

export async function getOrderHistory(userId) {
  const db = getDatabase();
  var results = [];
  try {
    const snapshot = await get(ref(db, `/purchaseOrders`));
    if (snapshot.exists()) {
      //   snapshot.forEach(function (childSnapshot) {
      //     //we are in the child node (purchaseOrder[n]) we need to go into the object to check fields
      //     childSnapshot.forEach(function (grandChildSnapshot) {
      //       //we are looping through all the keys in each object, hence we check for the buyerID field and make sure its equal to userId provided
      //       if (
      //         grandChildSnapshot.key == "buyerID" &&
      //         grandChildSnapshot.val() == userId
      //       ) {
      //         var json = childSnapshot.toJSON();
      //         results.push(json);
      //       }
      //     });
      //   });

      results = snapshot.val().filter((node) => node.buyerID === userId);
    } else {
      console.log("no data found");
    }
  } catch (e) {
    console.error(e);
  }
  console.log(results);
  return results;
}
