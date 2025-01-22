import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../component/Loader/Loader";
import { useAuth } from "../context/AuthProvider";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
      if (currentUser) {
        navigate("/");
      }
    }
  }, [loading, currentUser, navigate]);

  if (!isInitialized) {
    return <Loader />;
  }

  return children;
};

export default PublicRoute;
