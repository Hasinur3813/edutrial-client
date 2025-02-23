import ListItem from "../ListItem/ListItem";
import {
  FaBars,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaTimes,
  FaUserGraduate,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar, role }) => {
  return (
    <div
      className={`fixed z-50 w-64 top-0 left-0 h-full bg-offWhite dark:bg-slate-800 border-r dark:border-none p-4 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 `}
    >
      {/* sidebar toogle Button for Desktop */}
      <button
        className="text-lightGray p-3 rounded-r-full bg-primaryColor fixed -right-11 top-0 md:block"
        onClick={toggleSidebar}
      >
        {isSidebarOpen && <FaTimes className="text-xl" />}
        {!isSidebarOpen && <FaBars className="text-xl" />}
      </button>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaGraduationCap className="md:self-end text-2xl md:text-3xl lg:text-4xl text-primaryColor" />
          <Link
            to="/"
            className="text-2xl text-primaryColor font-extrabold tracking-wide"
          >
            EduTrial
          </Link>
        </div>
      </div>
      <hr className="my-3 border-primaryColor rounded-full border" />

      {/* Menu */}
      <h3 className="font-semibold text-lg mt-5 text-darkGray dark:text-lightGray">
        Menu
      </h3>

      {/* List */}
      <div className="flex flex-col space-y-4 h-full">
        <ul className="mt-4 space-y-2 ">
          <ListItem path="/dashboard" icon={FaUserGraduate}>
            My Profile
          </ListItem>

          {/* student route */}
          {role === "student" && (
            <ListItem
              path="/dashboard/my-enroll-class"
              icon={FaChalkboardTeacher}
            >
              My Enroll Class
            </ListItem>
          )}
          {role === "student" && (
            <ListItem path="/dashboard/payment-history">
              Payment History
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
              <ListItem path="/dashboard/overview" icon={FaChalkboardTeacher}>
                Overview
              </ListItem>
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
    </div>
  );
};

export default Sidebar;
