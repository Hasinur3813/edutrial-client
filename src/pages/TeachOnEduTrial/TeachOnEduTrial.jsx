import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { Button, notification, message } from "antd";
import { useState } from "react";
import useTeacherStatus from "../../hooks/useTeacherStatus";
import TeacherApprovedMessage from "../../component/TeacherApprovedMessage/TeacherApprovedMessage";
import Loader from "../../component/Loader/Loader";

const TeachOnWebsite = () => {
  const { currentUser } = useAuth();
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { teacherStatus, statusLoading, refetch } = useTeacherStatus();

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

  const onSubmit = async (data) => {
    const teachersData = {
      email: currentUser?.email,
      photoURL: currentUser?.photoURL,
      ...data,
    };

    if (teacherStatus.status === "pending") {
      notification.warning({
        message: "Please Wait!",
        description: "Already submitted, Please wait for admin approval!!",
      });
      return;
    }

    // submit data to server

    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post("/teachers/request", teachersData);
      if (data.data.insertedId || data.data.modifiedCount) {
        notification.success({
          message: "Success!",
          description:
            "Successfully submitted. Please wait for admin approval!",
        });

        setLoading(false);
        refetch();
      } else {
        setLoading(false);
        message.error("Submission failed, Please try again.");
      }
    } catch (error) {
      notification.error({
        message: "Error!",
        description:
          error.message ||
          error.response.data.message ||
          "Something wrong happened, Please try again after somethimes.",
      });

      setError(
        error.message ||
          error.response.data.message ||
          "Something wrong happened, Please try again after somethimes."
      );
      setLoading(false);
    }

    reset();
  };

  if (statusLoading) return <Loader />;

  return (
    <section className="py-48">
      <div className="max-w-4xl mx-auto dark:bg-slate-800 bg-lightGray border border-primaryColor p-8 rounded-lg shadow-lg">
        {/* Header */}

        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center  rounded-lg mb-8">
          {/* Left Section: Title */}

          <div className=" text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primaryColor">
              Teach on EduTrial
            </h1>
            <p className="text-muted dark:text-lightGray  mt-2 text-sm md:text-lg">
              Share your knowledge and inspire students around the world.
            </p>
          </div>

          {/* Right Section: User Info */}
          <div className="flex mt-10 sm:mt-0 items-center justify-center flex-col space-x-6">
            <img
              className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-4 border-primaryColor shadow-md"
              src={currentUser?.photoURL || "https://via.placeholder.com/150"}
              alt={currentUser?.displayName || "User"}
            />
            <div>
              <h4 className="text-base dark:text-primaryColor md:text-lg font-semibold text-darkGray">
                {currentUser?.displayName || "Unknown"}
              </h4>
              <p className="text-muted dark:text-lightGray mt-1 text-sm md:text-base">
                {currentUser?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        {teacherStatus?.status !== "approved" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-4">
              <label className="block dark:text-lightGray text-lg font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Enter your full name"
                className="input dark:bg-darkGray dark:text-lightGray  input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block dark:text-lightGray text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={currentUser?.email}
                readOnly
                className="input dark:bg-darkGray dark:text-lightGray input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Experience */}
            <div className="mb-4">
              <label className="block dark:text-lightGray text-lg font-semibold mb-2">
                Experience
              </label>
              <select
                {...register("experience", {
                  required: "Experience is required",
                })}
                className="select dark:bg-darkGray dark:text-lightGray select-bordered w-full"
              >
                <option value="">Select your experience level</option>
                <option value="Beginner">Beginner</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Experienced">Experienced</option>
              </select>
              {errors.experience && (
                <p className="text-red mt-1">{errors.experience.message}</p>
              )}
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block dark:text-lightGray text-lg font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter your teaching title"
                className="input dark:bg-darkGray dark:text-lightGray input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block dark:text-lightGray text-lg font-semibold mb-2">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="select dark:bg-darkGray dark:text-lightGray select-bordered w-full"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                loading={loading}
                disabled={loading || statusLoading}
                className="w-full py-3 bg-primaryColor"
                type="primary"
                htmlType="submit"
                size="large"
              >
                {teacherStatus?.status === "rejected"
                  ? "Request to another"
                  : "Submit for review"}
              </Button>

              {error && (
                <p className="text-sm font-semibold text-red my-3">{error}</p>
              )}
            </div>
          </form>
        )}

        {/* showing a message if the teacher request is approved */}
        {teacherStatus?.status === "approved" && <TeacherApprovedMessage />}
      </div>
    </section>
  );
};

export default TeachOnWebsite;
