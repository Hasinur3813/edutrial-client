import { FaUsers } from "react-icons/fa";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const ClassCard = ({ classes, isLoading }) => {
  const {
    _id: id,
    title,
    name,
    description,
    image,
    price,
    enrollments: totalEnrollments,
  } = classes;

  if (isLoading) {
    return (
      <div className="card card-compact bg-lightGray shadow-xl w-full animate-pulse">
        {/* Image Section */}
        <div className="relative h-56 w-full bg-gray-300 rounded-md">
          <div className="absolute bottom-2 left-3 bg-gray-400 h-6 w-32 rounded-md"></div>
        </div>

        {/* Card Body */}
        <div className="card-body !p-4">
          {/* Title Placeholder */}
          <div className="h-6 bg-gray-300 rounded-md mb-2"></div>

          {/* Short Description Placeholder */}
          <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-4"></div>

          {/* Price & Total Enrollment Section */}
          <div className="flex justify-between items-center my-4">
            {/* Price Placeholder */}
            <div className="h-8 w-16 bg-gray-300 rounded-md"></div>

            {/* Total Enrollment Placeholder */}
            <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
          </div>

          {/* Button Placeholder */}
          <div className="card-actions justify-end">
            <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key="class-card"
      className="card card-compact bg-lightGray shadow-xl w-full "
    >
      <figure className="relative">
        <img src={image} alt={title} className="h-56 w-full object-cover" />
        <p className="absolute bottom-2 left-3 bg-primaryColor text-white text-sm px-2 py-1 rounded-md">
          Instructor: {name}
        </p>
      </figure>

      <div className="card-body !p-4">
        {/* Title */}
        <h2 className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </h2>

        {/* Short Description */}
        <p className="text-sm text-muted text-left mt-1 text-ellipsis overflow-hidden whitespace-nowrap">
          {description}
        </p>

        {/* Price & Total Enrollment */}
        <div className="flex justify-between items-center my-4">
          {/* Price */}
          <span className="font-bold text-base bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-md">
            ${price}
          </span>

          {/* Total Enrollment */}
          <span className="flex items-center font-bold text-base bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-md">
            <FaUsers className="mr-2" /> {totalEnrollments || 0}
          </span>
        </div>

        {/* Enroll Button */}
        <div className="card-actions justify-end">
          <Link to={`/class-details/${id}`}>
            {" "}
            <Button className="!text-sm">Enroll</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
