import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loader from "../component/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }
  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
