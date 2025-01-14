import Navbar from "../component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../component/Footer/Footer";

const Root = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Toaster />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
