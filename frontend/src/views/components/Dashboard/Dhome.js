import { useEffect } from "react";
// import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../../redux/actions/orderAction.js";
import { getAdminProduct } from "../../../redux/actions/productAction";
import { getAllUsers } from "../../../redux/actions/userAction.js";

import "./dashboardHome.scss";

const Dhome = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // const lineState = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: ["#F75606"],
  //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  // const doughnutState = {
  //   labels: ["Out of Stock", "InStock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["#00A6B4", "#6800B4"],
  //       hoverBackgroundColor: ["#4B5000", "#35014F"],
  //       data: [outOfStock, products.length - outOfStock],
  //     },
  //   ],
  // };
  return (
    <div>
      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br /> ${totalAmount}
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
        </div>
      </div>

      <div className="lineChart">{/* <Line data={lineState} /> */}</div>

      <div className="doughnutChart">
        {/* <Doughnut data={doughnutState} /> */}
      </div>
    </div>
  );
};

export default Dhome;
