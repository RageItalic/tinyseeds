import orderStyles from "../styles/pastOrders.module.css";
import useAuthStore from "../store/auth";
import { auth } from "../utils/firebase";
import { getOrderHistory, getPlant } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const PastOrders = () => {
  const { isAuthenticated, isVerifying } = useAuth();
  const user = useAuthStore((state) => state.user);

  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      // console.log(user.uid);
      const value = await getOrderHistory(user.uid);
      setAllOrders(new Array(...value));
      setIsLoading(false);
    }

    getOrders();
    setTimeout(() => {
      for (let i = 0; i < allOrders.length; i++) {
        const productsBought = Object.values(allOrders[i].productsBought);
        for (let j = 0; j < productsBought.length; j++) {
          console.log(productsBought[j].name);
        }
      }
    }, 100);
  }, [isAuthenticated]);

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
              <th id={orderStyles.header}> Order Id</th>
              <th id={orderStyles.header}> Date of Purchase</th>
              <th id={orderStyles.header}> Status of Order</th>
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
