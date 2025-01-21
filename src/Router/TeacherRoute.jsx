import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loader from "../component/Loader/Loader";

const TeacherRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { user, isPending: isTeacherLoading } = useUserRole();
  const location = useLocation();

  if (loading || isTeacherLoading) {
    return <Loader />;
  }
  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  if (user?.userRole === "teacher" || user?.userRole === "admin") {
    return children;
  }
  return <Navigate to="/page-not-found" />;
};

export default TeacherRoute;
