import { useState } from "react";

import useUserRole from "../hooks/useUserRole";
import Loader from "../component/Loader/Loader";
import Sidebar from "../component/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isPending } = useUserRole();
  const role = user?.userRole;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-lightGray dark:bg-darkGray flex overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        role={role}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 overflow-y-auto ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
