import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import logo from "/logo.png";
const NavbarStart = () => {
  const { currentUser } = useAuth();
  return (
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu gap-y-2 menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
        >
          <li>
            <NavLink className="font-semibold text-base" to="/">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink className="font-semibold text-base" to="/all-classess">
              All Classess
            </NavLink>
          </li>
          {currentUser && (
            <li>
              <NavLink
                className="font-semibold text-base"
                to="/teach-on-edutrial"
              >
                Teach on EduTrial
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <Link to={"/"} className="font-bold text-3xl">
        <p className="flex gap-x-2 items-center justify-center">
          <img className="self-end pt-2 w-12 h-14" src={logo} alt="EduTrial" />
          <span className="text-darkGray">EduTrial</span>
        </p>
      </Link>
    </div>
  );
};

export default NavbarStart;
