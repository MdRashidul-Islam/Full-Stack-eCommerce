import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../views/components/common/Loader/Loader";

const AdminRoute = ({ children, ...rest }) => {
  const { user, loading } = useSelector((state) => state.user);

  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (!user.role === "admin") {
    return <Loader />;
  }
  if (user && user.role === "admin") {
    return children;
  }
  return <Navigate to="home" state={{ from: location }} />;
};

export default AdminRoute;
