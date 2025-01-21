import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUserGraduate,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import ListItem from "../component/ListItem/ListItem";
import useUserRole from "../hooks/useUserRole";
import Loader from "../component/Loader/Loader";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, isPending } = useUserRole();
  const role = user?.userRole;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-lightGray flex overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full bg-offWhite border-r p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaGraduationCap className="text-4xl text-primaryColor" />
            <Link
              to="/"
              className="text-2xl sm:text-3xl md:text-4xl text-primaryColor font-extrabold tracking-wide"
            >
              EduTrial
            </Link>
          </div>
          {/* Close Button for Desktop */}
          <button
            className="text-lightGray p-3 rounded-r-md bg-primaryColor fixed -right-11 top-0 md:block"
            onClick={toggleSidebar}
          >
            {isSidebarOpen && <FaTimes className="text-xl" />}
            {!isSidebarOpen && <FaBars className="text-xl" />}
          </button>
        </div>
        <hr className="my-3 border-primaryColor rounded-full border" />

        {/* Menu */}
        <h3 className="font-semibold text-lg mt-5 text-darkGray">Menu</h3>

        <ul className="mt-4 space-y-2">
          <ListItem icon={FaUserGraduate}>My Profile</ListItem>

          {/* student route */}
          {role === "student" && (
            <ListItem
              path="/dashboard/my-enroll-class"
              icon={FaChalkboardTeacher}
            >
              My Enroll Class
            </ListItem>
          )}

          {/* teacher route */}
          {role === "teacher" && (
            <>
              <ListItem path="/dashboard/my-class" icon={FaChalkboardTeacher}>
                My Class
              </ListItem>
              <ListItem path="/dashboard/add-class" icon={FaChalkboardTeacher}>
                Add Class
              </ListItem>
            </>
          )}
          {/* admin route */}
          {role === "admin" && (
            <>
              <ListItem
                path="/dashboard/teacher-request"
                icon={FaChalkboardTeacher}
              >
                Teacher Request
              </ListItem>
              <ListItem path="/dashboard/users" icon={FaChalkboardTeacher}>
                Users
              </ListItem>
              <ListItem
                path="/dashboard/all-classes"
                icon={FaChalkboardTeacher}
              >
                All Classes
              </ListItem>
            </>
          )}
        </ul>
      </div>

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
