import { useState } from "react";
import { Card, Modal, Input, DatePicker, Form } from "antd";
import Button from "../../component/Button/Button";

const MyClassDetails = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalEnrollment, setTotalEnrollment] = useState(50); // Example value
  const [totalAssignments, setTotalAssignments] = useState(5); // Example value
  const [totalSubmissions, setTotalSubmissions] = useState(20); // Example value

  const handleAddAssignment = (values) => {
    console.log("Assignment Details:", values);
    setTotalAssignments((prev) => prev + 1); // Increment total assignments
    setIsModalOpen(false); // Close modal
    alert("Assignment added successfully!");
    form.resetFields();
  };

  return (
    <div className="container mx-auto p-6 bg-lightGray min-h-screen">
      <h1 className="text-3xl font-bold text-primaryColor mb-6">
        Class Details
      </h1>

      {/* Class Progress Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {/* Total Enrollment Card */}
        <Card title="Total Enrollments" bordered className="shadow-md ">
          <p className="text-2xl font-semibold text-primaryColor">
            {totalEnrollment}
          </p>
        </Card>

        {/* Total Assignment Card */}
        <Card title="Total Assignments" bordered className="shadow-md">
          <p className="text-2xl font-semibold text-primaryColor">
            {totalAssignments}
          </p>
        </Card>

        {/* Total Submission Card */}
        <Card title="Total Submissions" bordered className="shadow-md">
          <p className="text-2xl font-semibold text-primaryColor">
            {totalSubmissions}
          </p>
        </Card>
      </div>

      {/* Class Assignment Section */}
      <div>
        <Button
          type="button"
          onAction={() => setIsModalOpen(true)}
          className="mb-6"
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
            <Button type="submit">Add Assignment</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyClassDetails;
