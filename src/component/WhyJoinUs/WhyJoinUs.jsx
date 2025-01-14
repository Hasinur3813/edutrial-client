import { FaChalkboardTeacher, FaUsers, FaClock, FaGlobe } from "react-icons/fa";
import Button from "../Button/Button";

const cards = [
  {
    icon: (
      <FaChalkboardTeacher className="text-5xl text-primaryColor mx-auto mb-4" />
    ),
    title: "Expert Guidance",
    description: "Learn from experienced educators and industry experts.",
  },
  {
    icon: <FaUsers className="text-5xl text-primaryColor mx-auto mb-4" />,
    title: "Community Support",
    description: "Be part of a vibrant and supportive learning community.",
  },
  {
    icon: <FaClock className="text-5xl text-primaryColor mx-auto mb-4" />,
    title: "Flexible Learning",
    description: "Learn at your own pace with flexible class schedules.",
  },
  {
    icon: <FaGlobe className="text-5xl text-primaryColor mx-auto mb-4" />,
    title: "Global Reach",
    description: "Connect with students and teachers from around the world.",
  },
];

const WhyJoinUs = () => {
  return (
    <section className="py-14 bg-offWhite">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <h3 className="text-primaryColor text-xl font-bold uppercase">
          Why Choose EduTrial?
        </h3>
        <h2 className="text-2xl md:text-4xl font-extrabold text-darkGray mt-2">
          Empowering Learning & Teaching
        </h2>
        <p className="text-muted text-base sm:text-lg mt-4">
          Discover why thousands of educators and students trust EduTrial for
          their academic journey.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-lightGray p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:shadow-primaryColor transition"
            >
              {card.icon}
              <h4 className="text-lg font-bold text-darkGray">{card.title}</h4>
              <p className="text-muted mt-2">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <Button className="mx-auto mt-10">Join Us Now</Button>
      </div>
    </section>
  );
};

export default WhyJoinUs;
