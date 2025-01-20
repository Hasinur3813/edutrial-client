import { useState } from "react";
import { Card, Modal, Input, DatePicker, Form, message, Button } from "antd";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MyClassDetails = () => {
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleAddAssignment = async (values) => {
    const assignment = {
      teacher_name: currentUser?.email,
      class_id: id,
      ...values,
    };
    try {
      setLoading(true);
      const { data } = await axios.post("/teachers/add-assignment", assignment);
      console.log(data);
      const result = data.data;
      if (result.insertedId) {
        message.success("Assignment created successfully!");
      } else {
        message.error("Assignment creation failed, Try again!");
      }
    } catch (error) {
      message.error(error.message || "Assignment creation failed, Try again!");
    } finally {
      refetch();
      form.resetFields();
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  // get class stats
  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classStats"],
    queryFn: async () => {
      const { data } = await axios.get(`/teachers/class-stats/${id}`);
      const result = data.data;
      return result;
    },
  });

  return (
    <div className="container mx-auto p-6 bg-lightGray min-h-screen">
      <h1 className="text-3xl font-bold text-primaryColor mb-6">
        Class Details
      </h1>

      {/* Class Progress Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {/* Total Enrollment Card */}
        <Card
          title="Total Enrollments"
          bordered
          className="shadow-md"
          loading={isLoading}
        >
          <p className="text-2xl font-semibold text-primaryColor">
            {stats?.totalEnrollments || 0}
          </p>
        </Card>

        {/* Total Assignment Card */}
        <Card
          title="Total Assignments"
          bordered
          className="shadow-md"
          loading={isLoading}
        >
          <p className="text-2xl font-semibold text-primaryColor">
            {stats?.totalAssignments || 0}
          </p>
        </Card>

        {/* Total Submission Card */}
        <Card
          title="Total Submissions"
          bordered
          className="shadow-md"
          loading={isLoading}
        >
          <p className="text-2xl font-semibold text-primaryColor">
            {stats?.totalSubmissions || 0}
          </p>
        </Card>
      </div>

      {/* Class Assignment Section */}
      <div>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="mb-6 bg-primaryColor hover:!bg-secondaryColor"
          size="large"
          htmlType="button"
        >
          Create Assignment
        </Button>
      </div>

      {/* Add Assignment Modal */}
      <Modal
        title="Add Assignment"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleAddAssignment}>
          {/* Assignment Title */}
          <Form.Item
            label="Assignment Title"
            name="title"
            rules={[
              { required: true, message: "Please enter assignment title!" },
            ]}
          >
            <Input placeholder="Enter assignment title" />
          </Form.Item>

          {/* Assignment Deadline */}
          <Form.Item
            label="Assignment Deadline"
            name="deadline"
            rules={[{ required: true, message: "Please select a deadline!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          {/* Assignment Description */}
          <Form.Item
            label="Assignment Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter assignment description!",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter assignment details" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              className="bg-primaryColor hover:!bg-secondaryColor"
              size="large"
            >
              {loading ? "Creating assignment..." : "Add Assignment"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyClassDetails;
