import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { Link } from "react-router-dom";
import "./orderSuccess.scss";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <h4>Your Order has been Placed successfully </h4>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
