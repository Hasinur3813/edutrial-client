import React from "react";
import Button from "../../component/Button/Button";

const enrolledClasses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    instructor: "Hasinur",
    image:
      "https://th.bing.com/th/id/OIP.2uKax6br6OljVbNjnHP7mQHaEK?w=333&h=187",
  },
  {
    id: 13,
    title: "Web Development Bootcamp",
    instructor: "Hasinur",
    image:
      "https://th.bing.com/th/id/OIP.2uKax6br6OljVbNjnHP7mQHaEK?w=333&h=187",
  },
  {
    id: 133,
    title: "Web Development Bootcamp",
    instructor: "Hasinur",
    image:
      "https://th.bing.com/th/id/OIP.2uKax6br6OljVbNjnHP7mQHaEK?w=333&h=187",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    instructor: "Jhankar Mahbub",
    image:
      "https://th.bing.com/th/id/OIP.LyI0PiZV6MtnS-FJv9Y7VAHaEK?w=333&h=187",
  },
];

const MyEnrollClass = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryColor mb-8">
        My Enrolled Classes
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {enrolledClasses.map((enrolledClass) => (
          <div
            key={enrolledClass.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Class Image */}
            <img
              src={enrolledClass.image}
              alt={enrolledClass.title}
              className="w-full h-40 object-cover"
            />

            {/* Class Details */}
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-semibold text-darkGray mb-2">
                {enrolledClass.title}
              </h2>
              <p className="text-sm text-muted">
                <strong>Instructor:</strong> {enrolledClass.instructor}
              </p>
            </div>

            {/* Continue Button */}
            <div className="p-4 border-t border-gray-200 text-center">
              <Button className={"w-full "}>Continue</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
