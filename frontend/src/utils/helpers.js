import axios from "axios";
import {
  getDatabase,
  get,
  ref,
  orderByChild,
  equalTo,
} from "firebase/database";

export const getFakeData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

export async function getOrderHistory(userId) {
  const db = getDatabase();
  var resu = [];
  try {
    const snapshot = await get(ref(db, `/purchaseOrders`));
    if (snapshot.exists()) {
      snapshot.forEach(function (childSnapshot) {
        //we are in the child node (purchaseOrder[n]) we need to go into the object to check fields
        childSnapshot.forEach(function (grandChildSnapshot) {
          //we are looping through all the keys in each object, hence we check for the buyerID field and make sure its equal to userId provided
          if (
            grandChildSnapshot.key == "buyerID" &&
            grandChildSnapshot.val() == userId
          ) {
            var json = childSnapshot.toJSON();
            resu.push(json);
          }
        });
      });
    } else {
      console.log("no data found");
    }
  } catch (e) {
    console.error(e);
  }
  console.log(resu);
}
