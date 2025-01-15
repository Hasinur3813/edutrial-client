import { FaUsers } from "react-icons/fa";
import Button from "../Button/Button";

const ClassCard = () => {
  return (
    <div
      key="class-card"
      className="card card-compact bg-lightGray shadow-xl w-full "
    >
      <figure className="relative">
        <img
          src="https://blog.allviaedu.com/wp-content/uploads/2023/09/Guide-To-Teaching-Large-Classes-Of-Children_AllviA_230926.jpg"
          alt="Class Thumbnail"
          className="h-48 w-full object-cover"
        />
        <p className="absolute bottom-2 left-3 bg-primaryColor/80 text-white text-sm px-2 py-1 rounded-md">
          Instructor: Hasinur
        </p>
      </figure>

      <div className="card-body !p-4">
        {/* Title */}
        <h2 className="text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          If a dog chews shoes whose shoes does he choose?
        </h2>

        {/* Short Description */}
        <p className="text-sm text-muted text-left mt-1">
          This class helps you master the skills of decision-making under unique
        </p>

        {/* Price & Total Enrollment */}
        <div className="flex justify-between items-center my-4">
          {/* Price */}
          <span className="font-bold text-base bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-md">
            $199
          </span>

          {/* Total Enrollment */}
          <span className="flex items-center font-bold text-base bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-md">
            <FaUsers className="mr-2" /> 99
          </span>
        </div>

        {/* Enroll Button */}
        <div className="card-actions justify-end">
          <Button>Enroll</Button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
