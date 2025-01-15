import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUserGraduate,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import ListItem from "../component/ListItem/ListItem";

const Dashboard = () => {
  return (
    // parent container
    <div className="w-full min-h-screen bg-lightGray flex">
      {/*the sidebar where all the routes will be demonstrated here*/}
      <div className="w-64 min-h-screen bg-offWhite border-r p-3">
        {/* header with website logo/name */}
        <div className="flex items-center space-x-3">
          {/* Icon */}
          <FaGraduationCap className="text-4xl text-primaryColor" />
          {/* Text */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl md:text-4xl text-primaryColor font-extrabold tracking-wide"
          >
            EduTrial
          </Link>
        </div>
        <hr className="my-3 border-primaryColor rounded-full border" />

        {/* menu area */}

        <h3 className="font-semibold text-lg mt-5 text-darkGray">Menu</h3>

        <ul className="mt-4 space-y-2">
          <ListItem icon={FaUserGraduate}>My Profile</ListItem>

          <ListItem
            path="/dashboard/my-enroll-class"
            icon={FaChalkboardTeacher}
          >
            My Enroll Class
          </ListItem>
        </ul>

        {/* end the sidebar */}
      </div>

      {/* child container 2 where the Outlet will be defined here*/}
      <div className="p-4 overflow-y-auto flex-1 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
