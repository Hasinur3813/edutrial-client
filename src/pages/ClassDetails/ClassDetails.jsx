import { Link, useParams } from "react-router-dom";
import Button from "../../component/Button/Button";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../axios/useAxiosPublic";

const ClassDetails = () => {
  const axios = useAxiosPublic();
  const { id } = useParams();
  const { data: classDetails = {} } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const result = await axios.get(`/users/single-class/?id=${id}`);
      const details = result.data.data;
      return details;
    },
  });
  return (
    <div className="max-w-6xl mx-auto px-4 mb-20 bg-lightGray dark:bg-darkGray mt-12">
      {/* Header Section */}
      <div className="text-center mb-20">
        {/* title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primaryColor">
          {classDetails.title}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10 items-start lg:items-center">
        {/* Image Section */}
        <div className="md:w-1/2 max-h-fit">
          <img
            src={classDetails.image}
            alt={classDetails.title}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 space-y-3">
          <p className="text-lg md:text-2xl font-semibold text-primaryColor">
            <span className="text-muted dark:text-lightGray font-medium">
              Instructor:
            </span>{" "}
            {classDetails.name}
          </p>

          <p className="text-lg md:text-2xl font-semibold text-muted dark:text-lightGray">
            <span className="text-muted dark:text-lightGray font-medium">
              Price:
            </span>{" "}
            <span className="text-primaryColor font-bold">
              ${classDetails.price}
            </span>
          </p>

          <p className="text-lg md:text-2xl font-semibold text-primaryColor">
            <span className="text-muted dark:text-lightGray font-medium">
              Total Enrollments:
            </span>{" "}
            {classDetails?.enrollments}{" "}
            {classDetails.enrollments > 1 ? "Students" : "Student"}
          </p>
          <p className=" text-base md:text-lg whitespace-pre-wrap overflow-hidden text-muted leading-relaxed dark:text-lightGray">
            {classDetails.description}
          </p>

          {/* Pay Button */}
          <Link to={"/payment"} state={classDetails}>
            <Button className="w-full mt-4 block">Pay Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
