import { getDatabase, get, ref, child, set } from "firebase/database";

/**
 * Returns an array of purchaseOrder objects. These objects have updated
 * productsBought variable which have modified plant objects in them. They are
 * basically plant objects but with an added qty variable which shows how many
 * of those items were ordered.
 * @param {*} userId id of the user
 * @returns Order object containing plants and
 */
export async function getPurchaseHistory(userId) {
  const db = getDatabase()
  console.log("userID", userId)

  try {
    const snapshot = await get(ref(db, '/purchaseOrders'))
    if (snapshot.exists()) {
      let userPurchases = Object.values(snapshot.val()).filter(purchase => purchase.buyerId === userId)

      console.log(userPurchases)
      let filteredUserPurchases = userPurchases.map(purchase => ({
        date: purchase.date,
        id: purchase.id,
        status: purchase.status,
        totalPrice: purchase.totalPrice
      }))
      return filteredUserPurchases
    }
  } catch (e) {
    console.error("Purchase history fetch failed")
  }

}




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

  console.log('function called', orders)

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

/**
 * Return multiple plants
 * @param {*} filters Filter for plants
 * Typical filter object looks like:
 * filter: {
 *   type: "Cactus"
 *   featured: "disable"
 * }
 * @returns Returns array of plants with specified filter
 */
export const getAllPlants = async (filter) => {
  const db = getDatabase();

  //no filter passed. Return all plants
  if (filter === undefined || filter === null) {
    try {
      const snapshot = await get(ref(db, `/plants`));
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        consoe.log("no plants found");
      }
    } catch (e) {
      console.error("getting plants failed", e);
    }
  }
  let plants = [];
  console.log(filter.featured);
  try {
    const snapshot = await get(ref(db, `/plants`));
    if (snapshot.exists()) {
      Object.values(snapshot.val()).forEach(async (plant) => {
        if (filter.type === "All") {
          if (String(filter.featured) === "false") {
            plants.push(plant);
          } else {
            if (filter.featured && plant.featured) {
              plants.push(plant);
            }
          }
        } else {
          if (String(filter.featured) === "false") {
            if (filter.type === plant.type) plants.push(plant);
          } else {
            if (
              String(filter.featured) === String(plant.featured) &&
              plant.type === filter.type
            ) {
              plants.push(plant);
            }
          }
        }
      });
    } else {
      console.log("no plants found");
    }
  } catch (e) {
    console.error(e);
  }

  console.log(plants);
  return plants;
};

/**
 * Save a purchase order in the database
 * @param {} purchaseOrder The order
 * Here is an example purchaseOrder object
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
 */
export function saveOrder(purchaseOrder) {
  const db = getDatabase();

  set(ref(db, `/purchaseOrders/${purchaseOrder.id}`), purchaseOrder.value);
}

/**
 * Add a review to single plant
 * @param {*} review Review object
 * @param {*} pid Plant id
 * Here is an example review object
 *  const testReview = {
    id: reviewId,
    value: {
      date: "2017-09-20T06:45:16 +04:00",
      description:
        "sunt commodo nostrud irure nostrud voluptate culpa nostrud aliqua laboris laboris incididunt do nisi dolore fugiat elit nisi pariatur duis laboris et Lorem enim exercitation aliqua do mollit nisi ea in in veniam et proident labore cupidatat enim fugiat Lorem",
      id: reviewId,
      index: "3",
      ratingOutOf5: "2.5",
      title: "look at this",
    },
  };
 */
export function addReview(review, pid) {
  const db = getDatabase();
  console.log("this is a review in helper", review)

  set(ref(db, `/plants/${pid}/reviews/${review.id}`), review.value);
}

/**
 * Get a specific user
 * @param {} uid Id of the user
 * @returns User with id
 */
export async function getUser(uid) {
  const db = getDatabase();
  let user = null;

  try {
    const snapshot = await get(ref(db, `/users/${uid}`)); //O(1)
    if (snapshot.exists()) {
      user = snapshot.val();
    } else {
      console.log("User does not exist!");
    }
  } catch (e) {
    console.error(e);
  }
  console.log(user);
  return user;
}

/**
 * Get all plants sold in specific month and year
 * @param {*} month Month it was sold
 * @param {*} year Year it was sold
 * @returns Plants sold in that month and year
 */
export async function getAllPlantsSold(month, year) {
  const db = getDatabase();
  let plants = [];
  let plantIds = [];
  let map = [];
  try {
    const snapshot = await get(ref(db, `/purchaseOrders`)); //O(1)
    if (snapshot.val()) {
      Object.values(snapshot.val()).forEach((order) => {
        let date = new Date(order.date);
        if (date.getMonth() === month && date.getFullYear() === year) {
          Object.values(order.productsBought).forEach((plant) => {
            //create a map between plants bought and qty
            if (map[plant.productId] === undefined) {
              map[plant.productId] = plant.qty;
            } else {
              map[plant.productId] =
                new Number(map[plant.productId]) + new Number(plant.qty) + "";
            }

            if (plantIds.indexOf(plant.productId) === -1) {
              plantIds.push(plant.productId);
            }
          });
        }
      });
    }
  } catch (e) {
    console.error(e);
  }

  for (let i = 0; i < plantIds.length; i++) {
    let plantId = plantIds[i];
    let plant = await getPlant(plantId);
    plant["qty"] = map[plantId];
    plants.push(plant);
  }

  return plants;
}


export const getUserCount = async () => {
  const db = getDatabase()

  try {
    const snapshot = await get(ref(db, '/users'))
    if (snapshot.exists()) {
      return Object.values(snapshot.val()).length
    }
  } catch (e) {
    console.error("User count failed", e)
  }

  return 0
}
/**
 * Get revenue in specific month
 * @param {*} month Month being viewed
 * @param {*} year Year being viewed
 * @returns Revenue in given month and year
 */
export async function getMonthRevenue(month, year) {
  const plantsInMonth = await getAllPlantsSold(month, year);
  let revenue = 0;
  console.log(plantsInMonth);
  for (let i = 0; i < plantsInMonth.length; i++) {
    revenue +=
      new Number(plantsInMonth[i].price) * new Number(plantsInMonth[i].qty);
  }

  return revenue;
}

/**
 * Returns revenue of website and products sold
 * @returns All the revenue we generated and quantity of products we sold
 */
export async function getAllTimeRevenue() {
  const db = getDatabase();
  let result = {
    revenue: 0,
    productsSold: 0,
  };

  try {
    const snapshot = await get(ref(db, `/purchaseOrders`));
    if (snapshot.exists()) {
      const allOrders = Object.values(snapshot.val());

      for (let i = 0; i < allOrders.length; i++) {
        const productsBought = Object.values(allOrders[i].productsBought);

        for (let j = 0; j < productsBought.length; j++) {
          let product = productsBought[j];
          let plant = await getPlant(product.productId);
          result.revenue += new Number(product.qty) * new Number(plant.price);
          result.productsSold += new Number(product.qty);
        }
      }

      return result;
    }
  } catch (e) {
    console.error(e);
  }
}
