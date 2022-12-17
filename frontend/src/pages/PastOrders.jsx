import orderStyles from "../styles/pastOrders.module.css";
import useAuthStore from "../store/auth";
import { auth } from "../utils/firebase";
import { getOrderHistory, getPlant, getPurchaseHistory } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const PastOrders = () => {
  const { isAuthenticated, isVerifying } = useAuth();
  const user = useAuthStore((state) => state.user);

  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOrders(uid) {
      console.log("INSIDE", uid)
      //const value = await getOrderHistory(uid);
      const value = await getPurchaseHistory(uid)
      console.log("look", value)
      setAllOrders(value);
      setIsLoading(false);
    }

    if (user) {
      console.log("yser", user.uid)
      getOrders(user.uid);
    }
  }, [user, isAuthenticated]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <div>
        <h1 id={orderStyles.title}>Orders</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <table className={orderStyles.myTable}>
          <thead>
            <tr id={orderStyles.row}>
              <th id={orderStyles.header}>Order Id</th>
              <th id={orderStyles.header}>Date of Purchase</th>
              <th id={orderStyles.header}>Status of Order</th>
              <th id={orderStyles.header}>Price</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => {
              return (
                <tr key={order.id}>
                  <td id={orderStyles.infoUnique}>{order.id}</td>
                  <td id={orderStyles.infoUnique}>
                    {order.date.split("T")[0]}
                  </td>
                  <td id={orderStyles.infoUnique}>{order.status}</td>
                  <td id={orderStyles.infoUnique}>${order.totalPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastOrders;
