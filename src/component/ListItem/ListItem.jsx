import { NavLink } from "react-router-dom";

const ListItem = ({ path, icon: Icon, children }) => {
  return (
    <li>
      <NavLink
        to={path}
        className="flex items-center bg-primaryColor/10 w-full px-4 py-3 rounded-lg text-lg font-semibold text-primaryColor hover:bg-primaryColor hover:text-lightGray transition duration-300 shadow-sm"
        href="#"
      >
        {Icon && <Icon className="text-xl mr-2" />}
        {children}
      </NavLink>
    </li>
  );
};

export default ListItem;
