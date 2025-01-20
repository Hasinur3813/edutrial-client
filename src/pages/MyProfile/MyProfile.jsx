const user = {
  name: "Hasinur Rahman",
  role: "Student",
  image:
    "https://th.bing.com/th?id=OIP.XIHKbawz2fk_9bU9wqDJuwHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
  email: "hasinur@gmail.com",
};

import { FaUserCircle, FaEnvelope, FaPhone, FaUserTag } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import useUserRole from "../../hooks/useUserRole";

const MyProfile = () => {
  const { currentUser } = useAuth();
  const { user } = useUserRole();

  return (
    <div className="max-w-3xl mx-auto my-10  bg-gradient-to-br from-white via-lightGray to-lightGray  rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-primaryColor">My Profile</h1>
        <FaUserCircle className="text-primaryColor text-5xl" />
      </div>

      {/* Profile Content */}
      <div className="bg-lightGray shadow-lg rounded-lg py-6 border border-primaryColor px-0 flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primaryColor">
          <img
            src={currentUser?.photoURL}
            alt={currentUser?.displayName || "User"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 text-lg text-muted font-medium">
            <FaUserTag className="text-primaryColor text-xl" />
            <span>Name:</span>
            <span className="text-gray-800 font-semibold">
              {currentUser?.displayName || "John Doe"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-lg text-muted font-medium">
            <FaUserTag className="text-primaryColor text-xl" />
            <span>Role:</span>
            <span className="text-gray-800 font-semibold capitalize">
              {user?.userRole}
            </span>
          </div>
          <div className="flex items-center gap-3 text-lg text-muted font-medium">
            <FaEnvelope className="text-primaryColor text-xl" />
            <span>Email:</span>
            <span className="text-gray-800 font-semibold">
              {currentUser?.email || "johndoe@example.com"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-lg text-muted font-medium">
            <FaPhone className="text-primaryColor text-xl" />
            <span>Phone:</span>
            <span className="text-gray-800 font-semibold">
              {currentUser?.phone || "Not Provided"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
