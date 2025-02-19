import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const Banner = () => {
  return (
    <section className="relative min-h-[500px] bg-cover bg-center text-lightGray py-48 bg-hero-pattern">
      <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
      {/* Overlay for text contrast */}
      <div className="container mx-auto text-center  ">
        <Fade duration={1500}>
          <h1 className="text-2xl lg:text-5xl font-semibold leading-tight mb-6">
            Empower Your Learning with{" "}
            <span className="text-primaryColor font-bold animate-pulse">
              <span className=" border-primaryColor border-2 rounded-md inline-block p-1 mr-1">
                Edu
              </span>
              Trial
            </span>
          </h1>
        </Fade>

        <Fade duration={500}>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            EduTrial is your all-in-one platform for group study, tutoring, and
            enhancing your learning experience. Join us and achieve academic
            excellence!
          </p>
        </Fade>

        <Fade>
          <Link to="/all-classes" className="inline-block">
            <Button className="!rounded-full">Get Started</Button>
          </Link>
        </Fade>
      </div>
    </section>
  );
};

export default Banner;
