import { Link } from "react-router-dom";
import teacher from "../../assets/teacher.png";
import Button from "../Button/Button";
const JoinAsTeacherSection = () => {
  return (
    <section className="py-14 ">
      <div className="container mx-auto px-3 space-y-10">
        {/* Section Title */}
        <div className="text-center">
          <h3 className="text-primaryColor text-xl font-bold uppercase">
            Join Us
          </h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-darkGray mt-2">
            Become a Teacher on EduTrial
          </h2>
          <p className="text-muted text-base sm:text-lg mt-4 lg:max-w-lg w-full mx-auto">
            Empower students to achieve their dreams by sharing your expertise
            and passion for teaching.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-xl text-primaryColor md:text-3xl font-bold">
              Share Your Knowledge, Shape the Future
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-5">
              Join EduTrial as a teacher and be part of a growing community of
              educators making a difference in student&apos;s lives. Inspire,
              teach, and help learners achieve their goals while growing your
              impact.
            </p>
            <Link to="/teach-on-edutrial" className="inline-block">
              <Button className="!px-4">Become A Teacher</Button>
            </Link>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={teacher} alt="Inspiring Teachers" className="lg:w-2/3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsTeacherSection;
