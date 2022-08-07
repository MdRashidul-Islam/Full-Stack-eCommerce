import LaunchIcon from "@mui/icons-material/Launch";
import { Fragment, useEffect } from "react";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { clearErrors, myOrders } from "../../../redux/actions/orderAction";
import Loader from "../common/Loader/Loader";
import MetaData from "../common/MetaData";

import "./myOrders.scss";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 id="myOrdersHeading">MY ORDER</h2>
          {orders.length ? (
            <div className="myOrdersPage">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Order ID</Th>
                    <Th>Status</Th>
                    <Th>Items Qty</Th>
                    <Th>Amount</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                {orders &&
                  orders.map((item) => (
                    <Tbody key={item._id}>
                      <Tr>
                        <Td>{item._id}</Td>
                        <Td
                          style={{
                            color: `${
                              item.orderStatus === "Delivered" ? "green" : "red"
                            }`,
                          }}
                        >
                          {item.orderStatus}
                        </Td>
                        <Td>{item.orderItems.length}</Td>
                        <Td>{item.totalPrice}</Td>
                        <Td>
                          <Link to={`/order/${item._id}`}>
                            <LaunchIcon style={{ color: "#3487B1" }} />
                          </Link>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
              </Table>
            </div>
          ) : (
            <div className="p_n_f">Orders not found</div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
