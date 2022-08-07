import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { loadUser } from "./redux/actions/userAction";
import store from "./store";

import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Cart from "./views/components/Cart/Cart";
import ConfirmOrder from "./views/components/Cart/ConfirmOrder";
import OrderSuccess from "./views/components/Cart/OrderSuccess";
import Payment from "./views/components/Cart/Payment";
import Shipping from "./views/components/Cart/Shipping";
import Loader from "./views/components/common/Loader/Loader";
import ScrollToTop from "./views/components/common/ScrollToTop";
import UserOptions from "./views/components/common/UserOptions";
import Dashboard from "./views/components/Dashboard/Dashboard";
import Dhome from "./views/components/Dashboard/Dhome";
import NewProduct from "./views/components/Dashboard/NewProduct";
import OrderList from "./views/components/Dashboard/OrderList";
import ProcessOrder from "./views/components/Dashboard/ProcessOrder";
import ProductList from "./views/components/Dashboard/ProductList";
import ProductReviews from "./views/components/Dashboard/ProductReviews";
import UpdateProduct from "./views/components/Dashboard/UpdateProduct";
import UpdateUser from "./views/components/Dashboard/UpdateUser";
import UsersList from "./views/components/Dashboard/UsersList";
import MyOrders from "./views/components/Order/MyOrders";
import OrderDetails from "./views/components/Order/OrderDetails";
import ForgotPassword from "./views/components/user/ForgotPassword";
import LoginSignUp from "./views/components/user/LoginSignUp";
import ResetPassword from "./views/components/user/ResetPassword";
import UpdatePassword from "./views/components/user/UpdatePassword";
import UpdateProfile from "./views/components/user/UpdateProfile";

import ProductDetailsPage from "./views/pages/ProductDetailsPage";
import ProductPage from "./views/pages/ProductPage";
import ProfilePage from "./views/pages/ProfilePage";

const HomePage = lazy(() => import("./views/pages/HomePage"));

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <ScrollToTop />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />

        {/* product route */}
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:keyword" element={<ProductPage />} />
        <Route
          path="product/:id"
          element={
            <PrivateRoute>
              <ProductDetailsPage />
            </PrivateRoute>
          }
        />

        {/* user route */}
        <Route path="login" element={<LoginSignUp />} />
        <Route
          path="account"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="account/update"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="password/update"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route path="password/forgot" element={<ForgotPassword />} />
        <Route path="password/reset/:token" element={<ResetPassword />} />

        {/* cart route */}
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="shipping"
          element={
            <>
              <PrivateRoute>
                <Shipping />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="order/confirm"
          element={
            <>
              <PrivateRoute>
                <ConfirmOrder />
              </PrivateRoute>
            </>
          }
        />
        <Route path="success" element={<OrderSuccess />} />
        <Route
          path="orders"
          element={
            <>
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="order/:id"
          element={
            <>
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            </>
          }
        />
        {stripeApiKey && (
          <Route
            path="process/payment"
            element={
              <>
                <PrivateRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </PrivateRoute>
              </>
            }
          />
        )}

        {/* Admin dashboard */}

        {user && user.role === "admin" && (
          <Route
            path="admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          >
            <Route
              path="products"
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />
            <Route
              path="product/:id"
              element={
                <AdminRoute>
                  <UpdateProduct />
                </AdminRoute>
              }
            />
            <Route
              path="product"
              element={
                <AdminRoute>
                  <NewProduct />
                </AdminRoute>
              }
            />
            <Route
              path="orders"
              element={
                <AdminRoute>
                  <OrderList />
                </AdminRoute>
              }
            />
            <Route
              path="order/:id"
              element={
                <AdminRoute>
                  <ProcessOrder />
                </AdminRoute>
              }
            />
            <Route
              path="users"
              element={
                <AdminRoute>
                  <UsersList />
                </AdminRoute>
              }
            />
            <Route
              path="user/:id"
              element={
                <AdminRoute>
                  <UpdateUser />
                </AdminRoute>
              }
            />
            <Route
              path="reviews"
              element={
                <AdminRoute>
                  <ProductReviews />
                </AdminRoute>
              }
            />
            <Route
              index
              element={
                <AdminRoute>
                  <Dhome />
                </AdminRoute>
              }
            />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
