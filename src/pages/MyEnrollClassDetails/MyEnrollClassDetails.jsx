import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-stars";
import Button from "../../component/Button/Button";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { Form, Button as AntButton, Input, message, Modal, Spin } from "antd";
import { useAuth } from "../../context/AuthProvider";
import { Controller, useForm } from "react-hook-form";

const MyEnrollClassDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const { id } = useParams();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignmentModal, setAssignmentModal] = useState(false);
  const axios = useAxiosSecure();
  const modalRef = useRef(null);

  useEffect(() => {
    const listener = window.addEventListener("click", (e) => {
      if (e.target.contains(modalRef.current)) {
        setIsModalOpen(false);
        reset();
      }
    });

    return () => window.removeEventListener("click", listener);
  }, [reset]);

  // fetch enrolled class by id
  const { data: enrolledClass = {} } = useQuery({
    queryKey: ["enrolledClass", id],
    queryFn: async () => {
      const { data } = await axios.get(`/users/enrolled-class/${id}`);
      return data.data;
    },
  });

  // fetch assignment
  const { data: assignments = [], refetch } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const { data } = await axios.get(`/users/all-assignments/${id}`);
      const result = data.data;
      setLoading(false);
      return result;
    },
  });

  const handleAssignmentSubmit = async (values) => {
    const submission = {
      ...values,
      user: currentUser?.email,
      classId: enrolledClass?._id,
      assignmentId: selectedAssignment?._id,
    };
    try {
      const { data } = await axios.post(
        `/users/assignment-submission`,
        submission
      );

      const result = data;
      if (result.data.insertedId) {
        message.success("Assignment submitted successfully!");
        handleCancel();
      } else if (result.error) {
        message.error(result.message);
      }
    } catch (error) {
      console.log(error);
      message.error(
        error.response?.data?.message ||
          "Assignment submission failed, Please try again!"
      );
    } finally {
      refetch();
    }
  };

  const handleModalSubmit = async (data) => {
    const feedback = {
      ...data,
      title: enrolledClass?.title,
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
      reset();
    }
  };

  const showModal = (assignment) => {
    setSelectedAssignment(assignment);
    setAssignmentModal(true);
  };
  const handleCancel = () => {
    setAssignmentModal(false);
    setSelectedAssignment(null);
    form.resetFields();
  };

  return (
    <div className="container mx-auto p-6 mt-5 bg-lightGray">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-primaryColor mb-6">
        {enrolledClass?.title || "Class Details"}
      </h1>

      {/* Assignments Table */}
      {loading ? (
        <div className="h-96 flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
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
                      onAction={() => showModal(assignment)}
                    >
                      Submit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assignment Modal */}
      {assignmentModal && (
        <Modal
          title="Submit Assignment"
          open={assignmentModal}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleAssignmentSubmit}>
            <Form.Item
              name="submissionLink"
              label="Submission Link"
              rules={[
                { required: true, message: "Please enter the submission link" },
              ]}
            >
              <Input placeholder="Enter the submission link" />
            </Form.Item>
            <Form.Item>
              <AntButton
                className="bg-primaryColor hover:!bg-secondaryColor"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Submit
              </AntButton>
            </Form.Item>
          </Form>
        </Modal>
      )}

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
            <form onSubmit={handleSubmit(handleModalSubmit)}>
              {/* Description Field */}
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primaryColor mb-4"
                rows="4"
                type="text"
                placeholder="Enter your feedback..."
                defaultValue=""
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red mt-1">{errors.description.message}</p>
              )}
              {/* Rating Field */}
              <label className="block text-muted font-semibold mb-2">
                Rating:
              </label>
              <Controller
                name="rating"
                control={control}
                defaultValue={0}
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <ReactStars
                    {...field}
                    count={5}
                    onChange={field.onChange}
                    size={30}
                    activeColor="#ffd700"
                    value={field.value}
                    emptyIcon={<FaStar />}
                    filledIcon={<FaStar />}
                  />
                )}
              />
              {errors.rating && (
                <p className="text-red mt-1">{errors.rating.message}</p>
              )}
              {/* Submit Button */}
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
