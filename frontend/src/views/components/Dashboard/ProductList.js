import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../../redux//actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../../redux/constants/productConstants";
import MetaData from "../common/MetaData";
import "./productList.scss";
import { useAlert } from "react-alert";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const matches = useMediaQuery("(max-width:700px)");
  const { loading, error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 0.7,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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
                <Table>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Stock</Th>
                      <Th>Price</Th>
                      <Th>Update</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  {products &&
                    products.map((item) => (
                      <Tbody key={item._id}>
                        <Tr>
                          <Td>{item._id}</Td>
                          <Td>{item.name}</Td>
                          <Td>{item.Stock}</Td>
                          <Td>{item.price}</Td>

                          <Td>
                            <Link to={`/admin/product/${item._id}`}>
                              <EditIcon sx={{ color: "#EF5306" }} />
                            </Link>
                          </Td>
                          <Td>
                            <Link
                              to="#"
                              onClick={() => deleteProductHandler(item._id)}
                            >
                              <DeleteIcon sx={{ color: "red" }} />
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
      {/* for mobile device */}
    </Fragment>
  );
};

export default ProductList;
