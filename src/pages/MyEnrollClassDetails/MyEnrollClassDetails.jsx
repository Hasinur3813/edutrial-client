import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-stars";
import Button from "../../component/Button/Button";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { message, notification } from "antd";
import { useAuth } from "../../context/AuthProvider";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluation, setEvaluation] = useState({
    description: "",
    rating: 0,
  });
  const axios = useAxiosSecure();
  const modalRef = useRef(null);

  useEffect(() => {
    const listener = window.addEventListener("click", (e) => {
      if (e.target.contains(modalRef.current)) {
        setIsModalOpen(false);
      }
    });

    return () => window.removeEventListener("click", listener);
  }, []);

  // fetch assignment
  const { data: assignments = [], refetch } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const { data } = await axios.get(`/users/all-assignments/${id}`);
      const result = data.data;
      return result;
    },
  });

  const handleSubmit = async (assignmentId) => {
    try {
      const { data } = await axios.patch(
        `/users/assignment-submission/${assignmentId}`
      );

      const result = data;
      if (result.success) {
        message.success("Assignment submission successfull!");
      }
      return result;
    } catch (error) {
      message.error(
        error?.message || "Assignment submission failed, Please try again!"
      );
    } finally {
      refetch();
    }
  };

  const handleModalSubmit = async () => {
    if (evaluation.description.length < 10) {
      return notification.error({
        title: "Error",
        message: "You must write minimum 10 words for feedback!",
      });
    }

    const feedback = {
      ...evaluation,
      name: currentUser?.displayName,
      image: currentUser?.photoURL,
    };

    try {
      const { data } = await axios.post("/users/feedback", feedback);
      const result = data.data;
      console.log(result);
      if (result.insertedId) {
        message.success("Thank you for your feedback!");
      } else {
        message.error("Failed to submit feedback, Try again!");
      }
    } catch (error) {
      message.error(
        `${error?.message}` || "Failed to submit feedback, Try again!"
      );
    } finally {
      setIsModalOpen(false);
      setEvaluation({
        description: "",
        rating: 0,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 mt-5 bg-lightGray">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-primaryColor mb-6">
        My Enroll Class Details
      </h1>

      {/* Assignments Table */}
      <div className="overflow-x-auto w-full">
        <table className=" w-full  bg-lightGray shadow-md rounded-lg">
          <thead className="bg-primaryColor text-lightGray">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Deadline</th>
              <th className="px-6 py-3 text-center">Submissions</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="border-b">
                <td className="px-6 py-4">{assignment.title}</td>
                <td className="px-6 py-4">{assignment.description}</td>
                <td className="px-6 py-4">
                  {new Date(assignment.deadline).toDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  {assignment.submissions || 0}
                </td>
                <td className="px-6 py-4 text-center">
                  <Button
                    className={"!bg-darkGray"}
                    onAction={() => handleSubmit(assignment._id)}
                  >
                    Submit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Teaching Evaluation Report */}
      <div className="mt-8">
        <Button onAction={() => setIsModalOpen(true)}>
          Teaching Evaluation Report (TER)
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-darkGray bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-lightGray p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold text-primaryColor mb-4">
              Teaching Evaluation Report
            </h2>
            {/* Description Field */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primaryColor mb-4"
              rows="4"
              placeholder="Enter your feedback..."
              value={evaluation.description}
              onChange={(e) =>
                setEvaluation((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
            {/* Rating Field */}
            <div className="mb-4">
              <label className="block text-muted font-semibold mb-2">
                Rating:
              </label>
              <ReactStars
                count={5}
                onChange={(newRating) =>
                  setEvaluation((prev) => ({ ...prev, rating: newRating }))
                }
                size={30}
                activeColor="#ffd700"
                value={evaluation.rating}
                emptyIcon={<FaStar />}
                filledIcon={<FaStar />}
              />
            </div>
            {/* Submit Button */}
            <Button type="button" onAction={handleModalSubmit}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
