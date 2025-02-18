import { FaUsers } from "react-icons/fa";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import ClassCardSkeleton from "../ClassCardSkeleton/ClassCardSkeletonl";

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
    return <ClassCardSkeleton />;
  }

  return (
    <div
      key="class-card"
      className="card card-compact bg-lightGray dark:bg-slate-800 shadow-xl w-full "
    >
      <figure className="relative">
        <img src={image} alt={title} className="h-56 w-full object-cover" />
        <p className="absolute bottom-2 left-3 bg-primaryColor text-white text-sm px-2 py-1 rounded-md">
          Instructor: {name}
        </p>
      </figure>

      <div className="card-body !p-4">
        {/* Title */}
        <h2 className="text-lg text-left font-bold text-ellipsis overflow-hidden whitespace-nowrap dark:text-primaryColor">
          {title}
        </h2>

        {/* Short Description */}
        <p className="text-sm text-muted text-left mt-1 text-ellipsis overflow-hidden whitespace-nowrap dark:text-lightGray">
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
