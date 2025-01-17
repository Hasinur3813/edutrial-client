import { NavLink } from "react-router-dom";

const ListItem = ({ path, icon: Icon, children }) => {
  return (
    <li>
      <NavLink
        to={path}
        className="flex items-center bg-primaryColor/0 w-full px-4 py-2 rounded-lg text-base font-semibold text-darkGray hover:!bg-primaryColor/10  transition duration-300 border-b"
      >
        {/* {Icon && <Icon className="text-xl mr-2" />} */}
        {children}
      </NavLink>
    </li>
  );
};

export default ListItem;
