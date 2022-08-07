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
  deleteUser,
  getAllUsers,
} from "../../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../../redux/constants/userConstants";
import Loader from "../common/Loader/Loader";
import MetaData from "../common/MetaData";
import "./productList.scss";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users, loading } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);

      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="productListContainer">
            <h1 id="productListHeading">ALL USERS</h1>

            <div className="myOrdersPage">
              <Table className="Table">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>EMAIL</Th>
                    <Th>ROLE</Th>
                    <Th>Update</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                {users &&
                  users.map((user) => (
                    <Tbody key={user._id}>
                      <Tr>
                        <Td>{user._id}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td style={{ textAlign: "center", fontWeight: "bold" }}>
                          {user.role}
                        </Td>

                        <Td style={{ textAlign: "center", fontWeight: "bold" }}>
                          <Link to={`/admin/user/${user._id}`}>
                            <EditIcon sx={{ color: "#3487B1" }} />
                          </Link>
                        </Td>
                        <Td style={{ textAlign: "center", fontWeight: "bold" }}>
                          <Link
                            to="#"
                            onClick={() => deleteUserHandler(user._id)}
                          >
                            <DeleteIcon sx={{ color: "#E54E39" }} />
                          </Link>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
              </Table>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
