import { useState } from "react";
import {
  Modal,
  Button as AntButton,
  Card,
  Form,
  Input,
  message,
  InputNumber,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MyClass = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Mathematics Basics",
      name: "John Doe",
      email: "johndoe@example.com",
      price: 50,
      description:
        "Learn the basics of mathematics in this beginner-friendly course.",
      image:
        "https://th.bing.com/th?id=OIP.2uKax6br6OljVbNjnHP7mQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      status: "Pending",
    },
    {
      id: 2,
      title: "Science Fundamentals",
      name: "John Doe",
      email: "johndoe@example.com",
      price: 75,
      description: "Explore fundamental concepts in science.",
      image:
        "https://th.bing.com/th?id=OIP.2uKax6br6OljVbNjnHP7mQHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      status: "Pending",
    },
  ]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this class?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setClasses(classes.filter((cls) => cls.id !== id));
        message.success("Class deleted successfully!");
      },
    });
  };

  const handleUpdate = (values) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, ...values } : cls
      )
    );
    setIsUpdateModalOpen(false);
    message.success("Class updated successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primaryColor mb-6">My Classes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card
            key={cls.id}
            hoverable
            size={"small"}
            cover={
              <div className="relative">
                <img className="rounded-md" alt={cls.title} src={cls.image} />

                <span className="absolute bottom-2 right-2 bg-primaryColor rounded-md px-3 py-1 text-sm text-lightGray">
                  Pending
                </span>
              </div>
            }
            actions={[
              <AntButton
                key={cls.id}
                type="link"
                className="text-primaryColor"
                onClick={() => {
                  setSelectedClass(cls);
                  setIsUpdateModalOpen(true);
                }}
              >
                Update
              </AntButton>,
              <AntButton
                key={cls.id}
                type="link"
                danger
                onClick={() => showDeleteConfirm(cls.id)}
              >
                Delete
              </AntButton>,
              <Link to={"/dashboard/my-class-details"} key={cls.id}>
                <AntButton
                  className="text-primaryColor"
                  key={cls.id}
                  type="link"
                >
                  See Details
                </AntButton>
              </Link>,
            ]}
          >
            <h3 className="text-lg font-bold">{cls.title}</h3>
            <p className="mb-2">{cls.description}</p>

            <div>
              <p>
                <strong>Name:</strong> {cls.name}
              </p>
              <p>
                <strong>Email:</strong> {cls.email}
              </p>
              <p>
                <strong>Price:</strong> ${cls.price}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <Modal
          title="Update Class"
          open={isUpdateModalOpen}
          onCancel={() => setIsUpdateModalOpen(false)}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={selectedClass}
            onFinish={handleUpdate}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input the class price!" },
                {
                  type: "number",
                  min: 0,
                  message: "Price must be a positive number",
                },
              ]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <div className="flex justify-end">
              <AntButton onClick={() => setIsUpdateModalOpen(false)}>
                Cancel
              </AntButton>
              <AntButton
                type="primary"
                htmlType="submit"
                className="ml-3 bg-primaryColor"
              >
                Update
              </AntButton>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default MyClass;
