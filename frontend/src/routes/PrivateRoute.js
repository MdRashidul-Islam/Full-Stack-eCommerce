import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../views/components/common/Loader/Loader";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, loading } = useSelector((state) => state.user);
  // const { user, isLoading } = useAuth();
  let location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
