import Navbar from "../component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../component/Footer/Footer";
import ScrollToTop from "../component/ScrollToTop/ScrollToTop";
const Root = () => {
  return (
    <div className="font-poppins dark:bg-darkGray">
      <ScrollToTop />
      <Navbar />
      <Toaster />
      <div className="min-h-screen dark:bg-darkGray">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
