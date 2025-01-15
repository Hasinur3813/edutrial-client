import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://edutrial.vercel.app",
  timeout: 5000,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logout, setLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logout();
          setLoading(false);
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, setLoading, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
