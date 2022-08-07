import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../../redux/actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../redux/constants/orderConstants";
import MetaData from "../common/MetaData";
import "./productList.scss";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          {loading ? (
            <div
              style={{
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                className="spinner"
              >
                Loading...
              </p>
            </div>
          ) : (
            <Fragment>
              <div className="myOrdersPage">
                <Table className="Table">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>itemsQty</Th>

                      <Th>amount</Th>
                      <Th>status</Th>
                      <Th>Update Status</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  {orders &&
                    orders.map((item) => (
                      <Tbody key={item._id}>
                        <Tr>
                          <Td>{item._id}</Td>
                          <Td
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {item.orderItems.length}
                          </Td>
                          <Td
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {item.totalPrice}
                          </Td>
                          <Td
                            style={{
                              color: `${
                                item.orderStatus === "Delivered"
                                  ? "green"
                                  : "red"
                              }`,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {item.orderStatus}
                          </Td>

                          <Td
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            <Link to={`/admin/order/${item._id}`}>
                              <EditIcon sx={{ color: "#3487B1" }} />
                            </Link>
                          </Td>
                          <Td
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            <Link
                              to="#"
                              onClick={() => deleteOrderHandler(item._id)}
                            >
                              <DeleteIcon sx={{ color: "#E54E39" }} />
                            </Link>
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                </Table>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
