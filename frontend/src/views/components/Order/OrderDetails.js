import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
} from "../../../redux/actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../common/Loader/Loader";
import MetaData from "../common/MetaData";
import "./orderDetails.scss";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { id } = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h4 component="h1">Order #{order && order._id}</h4>
              <h2>Shipping Info</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    Name: <span>{order.user && order.user.name}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Phone:
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Address:
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </p>
                </div>
              </div>

              <h2>Payment</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>
                    Amount:
                    <span>${order.totalPrice && order.totalPrice}</span>
                  </p>
                </div>
              </div>

              <h2>Order Status</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h2>Order Items:</h2>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X ${item.price} =
                        <b>${item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
