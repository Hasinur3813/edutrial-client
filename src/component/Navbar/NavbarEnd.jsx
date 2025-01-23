import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { FaSignInAlt } from "react-icons/fa";
import Button from "../Button/Button";
import { useEffect } from "react";

const NavbarEnd = () => {
  const { currentUser, loading, setLoading, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
    }
  }, [currentUser, loading, setLoading]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="navbar-end">
      {/* show user profile if the logged in */}
      {loading ? (
        // avatar skeleton
        <div className="animate-pulse w-10 h-10 bg-gray-300 rounded-full"></div>
      ) : currentUser ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primaryColor ring-offset-1 ring-offset-base-100">
              <img alt={currentUser?.displayName} src={currentUser?.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <p>Hasinur Rahman</p>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} type="button" className="text-red">
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to={"/login"}>
          <Button className="!text-base" icon={FaSignInAlt}>
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavbarEnd;
