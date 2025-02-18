import { FaUserCircle, FaEnvelope, FaPhone, FaUserTag } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import useUserRole from "../../hooks/useUserRole";

const MyProfile = () => {
  const { currentUser } = useAuth();
  const { user } = useUserRole();

  return (
    <div className="max-w-4xl mx-auto my-10 p-0">
      {/* Profile Container */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primaryColor to-secondaryColor text-white py-8 px-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={currentUser?.photoURL}
              alt={currentUser?.displayName || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mt-4">
            {currentUser?.displayName || "Anonymous"}
          </h1>
          <p className="text-sm opacity-80">{user?.userRole || "Unknown"}</p>
        </div>

        {/* Info Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-slate-800">
          {/* Name */}
          <div className="flex items-center gap-4 bg-lightGray dark:bg-darkGray p-4 rounded-lg shadow">
            <FaUserCircle className="text-primaryColor text-2xl" />
            <div>
              <p className="text-sm font-semibold text-muted dark:text-lightGray">
                Name
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-lightGray">
                {currentUser?.displayName || "Anonymous"}
              </p>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center gap-4 bg-lightGray dark:bg-darkGray p-4 rounded-lg shadow">
            <FaEnvelope className="text-primaryColor text-2xl" />
            <div>
              <p className="text-sm font-semibold text-muted dark:text-lightGray">
                Email
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-lightGray">
                {currentUser?.email || "Unknown"}
              </p>
            </div>
          </div>
          {/* Role */}
          <div className="flex items-center gap-4 bg-lightGray dark:bg-darkGray p-4 rounded-lg shadow">
            <FaUserTag className="text-primaryColor text-2xl" />
            <div>
              <p className="text-sm font-semibold text-muted dark:text-lightGray">
                Role
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-lightGray capitalize">
                {user?.userRole || "Unknown"}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 bg-lightGray dark:bg-darkGray p-4 rounded-lg shadow">
            <FaPhone className="text-primaryColor text-2xl" />
            <div>
              <p className="text-sm font-semibold text-muted dark:text-lightGray">
                Phone
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-lightGray">
                {currentUser?.phone || "Not Provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {/* <div className="bg-gray-50 py-4 px-6 text-center">
          <p className="text-sm text-gray-600">
            Manage your profile settings in the dashboard.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
