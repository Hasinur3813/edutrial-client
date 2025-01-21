import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loader from "../component/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { user, isPending: isAdminLoading } = useUserRole();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loader />;
  }
  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  if (user?.userRole !== "admin") {
    return <Navigate to="/page-not-found" />;
  }

  return children;
};

export default AdminRoute;
