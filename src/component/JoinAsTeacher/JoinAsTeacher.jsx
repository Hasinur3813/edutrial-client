import { Link } from "react-router-dom";
import teacher from "../../assets/teacher.png";
import Button from "../Button/Button";
import { Fade } from "react-awesome-reveal";
const JoinAsTeacherSection = () => {
  return (
    <section className="py-14 dark:bg-darkGray">
      <div className="container mx-auto px-3 space-y-10">
        {/* Section Title */}
        <div className="text-center">
          <Fade direction="up" duration={2000}>
            <h3 className="text-primaryColor text-xl font-bold uppercase">
              Join Us
            </h3>
          </Fade>

          <Fade duration={1800} direction="up">
            <h2 className="text-2xl dark:text-lightGray sm:text-3xl md:text-4xl font-extrabold text-darkGray mt-2">
              Become a Teacher on EduTrial
            </h2>
          </Fade>
          <Fade duration={1500} direction="up">
            <p className="text-muted dark:text-lightGray text-base sm:text-lg mt-4 lg:max-w-lg w-full mx-auto">
              Empower students to achieve their dreams by sharing your expertise
              and passion for teaching.
            </p>
          </Fade>
        </div>

        {/* Content Section */}
        <Fade duration={2000}>
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Side: Text Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-xl text-primaryColor md:text-3xl font-bold">
                Share Your Knowledge, Shape the Future
              </h2>
              <p className="text-muted dark:text-lightGray text-base sm:text-lg leading-relaxed mb-5">
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
              <img
                src={teacher}
                alt="Inspiring Teachers"
                className="lg:w-2/3"
              />
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default JoinAsTeacherSection;
