import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { FaSignInAlt } from "react-icons/fa";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import useUserRole from "../../hooks/useUserRole";

const NavbarEnd = () => {
  const { currentUser, loading, setLoading, logout } = useAuth();
  const [theme, setTheme] = useState("light");
  const { user } = useUserRole();

  const handleThemeChange = (e) => {
    const theme = e.target.value === "light" ? "dark" : "light";
    setTheme(theme);
    document.documentElement.classList = theme;
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
    }

    // set theme from localstorage
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
      setTheme(theme);
      document.documentElement.classList = theme;
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
      <ThemeToggler theme={theme} handleThemeChange={handleThemeChange} />

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
            className="menu dark:bg-darkGray dark:text-lightGray menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/dashboard">{currentUser?.displayName}</Link>
            </li>
            {/* keep here some dashboard route based onthe user role */}

            {user?.userRole === "student" && (
              <li>
                <Link to="/dashboard/my-enroll-class">My Enroll Class</Link>
              </li>
            )}
            {user?.userRole === "teacher" && (
              <>
                <li>
                  <Link to="/dashboard/my-class">My Class</Link>
                </li>
                <li>
                  <Link to="/dashboard/add-class">Add Class</Link>
                </li>
              </>
            )}
            {user?.userRole === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/overview">Dashboard Overview</Link>
                </li>
                <li>
                  <Link to="/dashboard/users">Users</Link>
                </li>
              </>
            )}
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
