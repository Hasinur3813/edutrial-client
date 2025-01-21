import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://edutrial.vercel.app",
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
