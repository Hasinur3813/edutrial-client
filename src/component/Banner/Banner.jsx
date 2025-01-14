import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative min-h-[500px] bg-cover bg-center text-lightGray py-24 bg-hero-pattern">
      <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
      {/* Overlay for text contrast */}
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-2xl lg:text-5xl font-semibold leading-tight mb-6">
          Empower Your Learning with{" "}
          <span className="text-primaryColor font-bold animate-pulse">
            EduTrial
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          EduTrial is your all-in-one platform for group study, tutoring, and
          enhancing your learning experience. Join us and achieve academic
          excellence!
        </p>
        <Link to="/all-clasess" className="inline-block">
          <Button className="!rounded-full">Get Started</Button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
