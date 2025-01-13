import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarEnd = ({ currentUser }) => {
  return (
    <div className="navbar-end">
      {/* show login and signup if not logged in */}
      {!currentUser && (
        <Link to={"/signup"}>
          <Button className="!bg-primaryColor hover:!bg-secondaryColor px-6 !text-lightGray">
            Sign In
          </Button>
        </Link>
      )}

      {/* show user profile if the logged in */}
      {currentUser && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primaryColor ring-offset-1 ring-offset-base-100">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
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
              <button type="button">Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarEnd;
