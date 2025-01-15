const Button = ({ onAction, className, children, icon: Icon, type }) => {
  return (
    <button
      onClick={onAction}
      type={type}
      className={`${className} flex items-center justify-center px-6 py-3 bg-primaryColor text-lightGray text-lg font-semibold rounded-lg hover:bg-secondaryColor focus:outline-none focus:ring-4 focus:ring-primaryColor/50 transition duration-300 ease-in-out`}
    >
      {Icon && <Icon className="text-lg mr-2" />}
      {children}
    </button>
  );
};

export default Button;
