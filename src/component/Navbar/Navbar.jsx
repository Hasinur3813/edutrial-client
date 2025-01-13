import NavbarStart from "./NavbarStart";
import NavbarCenter from "./NavbarCenter";
import NavbarEnd from "./NavbarEnd";

const Navbar = () => {
  const currentUser = false;
  return (
    <div className="navbar shadow-sm">
      <NavbarStart />
      <NavbarCenter />
      <NavbarEnd currentUser={currentUser} />
    </div>
  );
};

export default Navbar;
