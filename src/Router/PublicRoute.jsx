import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
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
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin tip="loading" size="large" />
      </div>
    );
  }

  return children;
};

export default PublicRoute;
