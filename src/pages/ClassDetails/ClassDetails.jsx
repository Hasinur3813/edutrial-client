import Button from "../../component/Button/Button";

const classDetails = {
  title: "Mastering Full-Stack Development",
  image:
    "https://th.bing.com/th?id=OIP.2uKax6br6OljVbNjnHP7mQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
  teacher: "Hasinur Rahman",
  price: 200,
  totalEnrollments: 200,
  description:
    "Join this course to master full-stack web development, including the latest tools and technologies for front-end and back-end development. Build projects, gain experience, and enhance your portfolio.",
};

const ClassDetails = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 mb-20 bg-lightGray mt-12">
      {/* Header Section */}
      <div className="text-center mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primaryColor">
          {classDetails.title}
        </h1>
        <p className="text-base sm:text-lg text-muted mt-4">
          Learn from the best and advance your career with this comprehensive
          class.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10 items-start lg:items-center">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={classDetails.image}
            alt={classDetails.title}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 space-y-3">
          <p className="text-lg md:text-2xl font-semibold text-primaryColor">
            <span className="text-muted font-medium">Instructor:</span>{" "}
            {classDetails.teacher}
          </p>

          <p className="text-lg md:text-2xl font-semibold text-muted">
            <span className="text-muted font-medium">Price:</span>{" "}
            <span className="text-primaryColor font-bold">
              ${classDetails.price}
            </span>
          </p>

          <p className="text-lg md:text-2xl font-semibold text-primaryColor">
            <span className="text-muted font-medium">Total Enrollments:</span>{" "}
            {classDetails.totalEnrollments} students
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {classDetails.description}
          </p>

          {/* Pay Button */}
          <Button className="w-full">Pay Now</Button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
