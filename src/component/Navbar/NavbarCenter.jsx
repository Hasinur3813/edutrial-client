import { NavLink } from "react-router-dom";

const NavbarCenter = () => {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal dark:text-primaryColor px-1 gap-x-2">
        <li>
          <NavLink className="font-semibold text-base" to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className="font-semibold text-base" to="/all-classes">
            All Classes
          </NavLink>
        </li>

        <li>
          <NavLink className="font-semibold text-base" to="/teach-on-edutrial">
            Teach on EduTrial
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarCenter;
