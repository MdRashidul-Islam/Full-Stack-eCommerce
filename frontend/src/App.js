import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { loadUser } from "./redux/actions/userAction";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import store from "./store";
// import Shipping from "./views/components/Cart/Shipping";
import Loader from "./views/components/common/Loader/Loader";
import ScrollToTop from "./views/components/common/ScrollToTop";
import UserOptions from "./views/components/common/UserOptions";

const Shipping = lazy(() => import("./views/components/Cart/Shipping"));
const Payment = lazy(() => import("./views/components/Cart/Payment"));
const ConfirmOrder = lazy(() => import("./views/components/Cart/ConfirmOrder"));

const OrderSuccess = lazy(() => import("./views/components/Cart/OrderSuccess"));

const Cart = lazy(() => import("./views/components/Cart/Cart"));
const Dashboard = lazy(() => import("./views/components/Dashboard/Dashboard"));

const Dhome = lazy(() => import("./views/components/Dashboard/Dhome"));
const NewProduct = lazy(() =>
  import("./views/components/Dashboard/NewProduct")
);
const OrderList = lazy(() => import("./views/components/Dashboard/OrderList"));
const ProcessOrder = lazy(() =>
  import("./views/components/Dashboard/ProcessOrder")
);
const ProductList = lazy(() =>
  import("./views/components/Dashboard/ProductList")
);
const ProductReviews = lazy(() =>
  import("./views/components/Dashboard/ProductReviews")
);
const UpdateProduct = lazy(() =>
  import("./views/components/Dashboard/UpdateProduct")
);
const UpdateUser = lazy(() =>
  import("./views/components/Dashboard/UpdateUser")
);
const UsersList = lazy(() => import("./views/components/Dashboard/UsersList"));
const MyOrders = lazy(() => import("./views/components/Order/MyOrders"));
const OrderDetails = lazy(() =>
  import("./views/components/Order/OrderDetails")
);
const ForgotPassword = lazy(() =>
  import("./views/components/user/ForgotPassword")
);
const LoginSignUp = lazy(() => import("./views/components/user/LoginSignUp"));
const ResetPassword = lazy(() =>
  import("./views/components/user/ResetPassword")
);
const UpdatePassword = lazy(() =>
  import("./views/components/user/UpdatePassword")
);
const UpdateProfile = lazy(() =>
  import("./views/components/user/UpdateProfile")
);
const HomePage = lazy(() => import("./views/pages/HomePage"));
const ProductDetailsPage = lazy(() =>
  import("./views/pages/ProductDetailsPage")
);
const ProductPage = lazy(() => import("./views/pages/ProductPage"));
const ProfilePage = lazy(() => import("./views/pages/ProfilePage"));

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
            <>
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            </>
          }
        />

        {/* product route */}
        <Route
          path="products"
          element={
            <>
              <Suspense fallback={<Loader />}>
                <ProductPage />
              </Suspense>
            </>
          }
        />

        <Route
          path="products/:keyword"
          element={
            <>
              <Suspense fallback={<Loader />}>
                <ProductPage />
              </Suspense>
            </>
          }
        />
        <Route
          path="product/:id"
          element={
            <>
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <ProductDetailsPage />
                </Suspense>
              </PrivateRoute>
            </>
          }
        />

        {/* user route */}
        <Route
          path="login"
          element={
            <Suspense fallback={<Loader />}>
              <LoginSignUp />
            </Suspense>
          }
        />
        <Route
          path="account"
          element={
            <>
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <ProfilePage />
                </Suspense>
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="account/update"
          element={
            <>
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <UpdateProfile />
                </Suspense>
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="password/update"
          element={
            <>
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <UpdatePassword />
                </Suspense>
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="password/forgot"
          element={
            <>
              <Suspense fallback={<Loader />}>
                <ForgotPassword />
              </Suspense>
            </>
          }
        />
        <Route
          path="password/reset/:token"
          element={
            <>
              <Suspense fallback={<Loader />}>
                <ResetPassword />
              </Suspense>
            </>
          }
        />

        {/* cart route */}
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Cart />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="shipping"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Shipping />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="order/confirm"
          element={
            <>
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <ConfirmOrder />
                </Suspense>
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
                <Suspense fallback={<Loader />}>
                  <MyOrders />
                </Suspense>
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="order/:id"
          element={
            <>
              <PrivateRoute>
                <Suspense fallback={<Loader />}>
                  <OrderDetails />
                </Suspense>
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
                    <Suspense fallback={<Loader />}>
                      <Payment />
                    </Suspense>
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
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              </AdminRoute>
            }
          >
            <Route
              path="products"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <ProductList />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              path="product/:id"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateProduct />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              path="product"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <NewProduct />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              path="orders"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <OrderList />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              path="order/:id"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <ProcessOrder />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              path="users"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <UsersList />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              path="user/:id"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateUser />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              path="reviews"
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <ProductReviews />
                  </Suspense>
                </AdminRoute>
              }
            />
            <Route
              index
              element={
                <AdminRoute>
                  <Suspense fallback={<Loader />}>
                    <Dhome />
                  </Suspense>
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
