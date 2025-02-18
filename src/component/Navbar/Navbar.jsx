import NavbarStart from "./NavbarStart";
import NavbarCenter from "./NavbarCenter";
import NavbarEnd from "./NavbarEnd";

const Navbar = () => {
  return (
    <div className="navbar bg-lightGray dark:bg-slate-800 fixed top-0 z-10 shadow-sm">
      <NavbarStart />
      <NavbarCenter />
      <NavbarEnd />
    </div>
  );
};

export default Navbar;
