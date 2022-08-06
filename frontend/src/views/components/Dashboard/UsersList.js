import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { Fragment, useEffect } from "react";
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
import { useAlert } from "react-alert";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const matches = useMediaQuery("(max-width:700px)");

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
      navigate("/admin");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", width: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      width: 150,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      width: 100,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      width: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      width: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

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
              <Table>
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
                        <Td>{user.role}</Td>

                        <Td>
                          <Link to={`/admin/product/${user._id}`}>
                            <EditIcon sx={{ color: "#EF5306" }} />
                          </Link>
                        </Td>
                        <Td>
                          <Link
                            to="#"
                            onClick={() => deleteUserHandler(user._id)}
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </Link>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
              </Table>
            </div>

            {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              /> */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
