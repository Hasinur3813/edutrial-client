import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";

const TeachOnWebsite = () => {
  const { currentUser } = useAuth();

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphic Design",
    "Data Science",
    "Cybersecurity",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Add form submission logic here
    reset(); // Clear the form after submission
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg my-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-gray-50 p-6 rounded-lg shadow-md mb-8">
        {/* Left Section: Title */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-primaryColor">
            Teach on EduTrial
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Share your knowledge and inspire students around the world.
          </p>
        </div>

        {/* Right Section: User Info */}
        <div className="flex items-center md:flex-col space-x-6">
          <img
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primaryColor shadow-md"
            src={currentUser?.photoURL || "https://via.placeholder.com/150"}
            alt={currentUser?.displayName || "User"}
          />
          <div>
            <h4 className="text-xl font-semibold text-gray-800">
              {currentUser?.displayName || "John Doe"}
            </h4>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              {currentUser?.email || "johndoe@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            value={currentUser?.displayName || "John Doe"}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            value={currentUser?.email || "johndoe@example.com"}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Experience</label>
          <select
            {...register("experience", { required: "Experience is required" })}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select your experience level
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Experienced">Experienced</option>
          </select>
          {errors.experience && (
            <p className="text-red-500 mt-1">{errors.experience.message}</p>
          )}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter your teaching title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full text-lg">
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeachOnWebsite;
