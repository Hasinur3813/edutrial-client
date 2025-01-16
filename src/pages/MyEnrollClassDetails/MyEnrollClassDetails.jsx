import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-stars";
import Button from "../../component/Button/Button";

const MyEnrollClassDetails = () => {
  //   const { id } = useParams(); // Get class ID from the URL
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Assignment 1",
      description: "Solve the given problems in the document.",
      deadline: "2025-02-10",
      submissions: 5,
    },
    {
      id: 2,
      title: "Assignment 2",
      description: "Prepare a presentation on topic X.",
      deadline: "2025-02-15",
      submissions: 3,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluation, setEvaluation] = useState({
    description: "",
    rating: 0,
  });

  const handleSubmit = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, submissions: assignment.submissions + 1 }
          : assignment
      )
    );
    alert("Assignment submitted successfully!");
  };

  const handleModalSubmit = () => {
    console.log("Teaching Evaluation Submitted:", evaluation);
    setIsModalOpen(false);
    setEvaluation({ description: "", rating: 0 });
    alert("Evaluation submitted successfully!");
  };

  return (
    <div className="container mx-auto p-6 mt-5 bg-lightGray">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-primaryColor mb-6">
        My Enroll Class Details
      </h1>

      {/* Assignments Table */}
      <div className="overflow-x-scroll w-full">
        <table className="w-full bg-lightGray shadow-md rounded-lg">
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
              <tr key={assignment.id} className="border-b">
                <td className="px-6 py-4">{assignment.title}</td>
                <td className="px-6 py-4">{assignment.description}</td>
                <td className="px-6 py-4">{assignment.deadline}</td>
                <td className="px-6 py-4 text-center">
                  {assignment.submissions}
                </td>
                <td className="px-6 py-4 text-center">
                  <Button
                    className={"!bg-darkGray"}
                    onAction={() => handleSubmit(assignment.id)}
                  >
                    Submit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Teaching Evaluation Report Button */}
      <div className="mt-8">
        <Button onAction={() => setIsModalOpen(true)}>
          Teaching Evaluation Report (TER)
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
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
              <label className="block text-gray-700 font-semibold mb-2">
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
            <button
              className="btn btn-primary px-6 py-3"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
            {/* Close Modal */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-primaryColor"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
