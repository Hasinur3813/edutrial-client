import Navbar from "../component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Toaster />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
