import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
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
                <Table className="Table">
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
                          <Td
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {item.Stock}
                          </Td>
                          <Td style={{ textAlign: "center" }}>{item.price}</Td>

                          <Td style={{ textAlign: "center" }}>
                            <Link to={`/admin/product/${item._id}`}>
                              <EditIcon sx={{ color: "#3487B1" }} />
                            </Link>
                          </Td>
                          <Td style={{ textAlign: "center" }}>
                            <Link
                              to="#"
                              onClick={() => deleteProductHandler(item._id)}
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

export default ProductList;
