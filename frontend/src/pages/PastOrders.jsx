import orderStyles from "../styles/pastOrders.module.css";
import useAuthStore from "../store/auth";
import { auth } from "../utils/firebase";

const PastOrders = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <div>
        <h1 id={orderStyles.title}>Orders</h1>
      </div>
      <div>
        <table className={orderStyles.myTable}>
          <tr id={orderStyles.row}>
            <th id={orderStyles.header}> User</th>
            <th id={orderStyles.header}> Products</th>
            <th id={orderStyles.header}> Date of Purchase</th>
            <th id={orderStyles.header}> Status of Order</th>
          </tr>
          <tr>
            <td id={orderStyles.infoUnique}>
              {user.displayName ?? user.email}
            </td>
            <td id={orderStyles.infoUnique}>test</td>
            <td id={orderStyles.infoUnique}>test</td>
            <td id={orderStyles.infoUnique}>test</td>
          </tr>
          <tr>
            <td id={orderStyles.info}>{user.displayName ?? user.email}</td>
            <td id={orderStyles.info}>test</td>
            <td id={orderStyles.info}>test</td>
            <td id={orderStyles.info}>test</td>
          </tr>
          <tr>
            <td id={orderStyles.infoUnique}>
              {user.displayName ?? user.email}
            </td>
            <td id={orderStyles.infoUnique}>test</td>
            <td id={orderStyles.infoUnique}>test</td>
            <td id={orderStyles.infoUnique}>test</td>
          </tr>
          <tr>
            <td id={orderStyles.info}>{user.displayName ?? user.email}</td>
            <td id={orderStyles.info}>test</td>
            <td id={orderStyles.info}>test</td>
            <td id={orderStyles.info}>test</td>
          </tr>
          <tr>
            <td id={orderStyles.infoUnique}>
              {user.displayName ?? user.email}
            </td>
            <td id={orderStyles.infoUnique}>test</td>
            <td id={orderStyles.infoUnique}>test</td>
            <td id={orderStyles.infoUnique}>test</td>
          </tr>
        </table>
        <br></br>
        <div className={orderStyles.buttons}>
          <a href="#" className={orderStyles.previous} id={orderStyles.round}>
            &#8249;
          </a>
          <a href="#" className={orderStyles.next} id={orderStyles.round}>
            &#8250;
          </a>
        </div>
      </div>
    </div>
  );
};

export default PastOrders;
