import { useState } from "react";
import {
  Modal,
  Button as AntButton,
  Card,
  Form,
  Input,
  message,
  InputNumber,
  Empty,
  Pagination,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../component/Loader/Loader";

const MyClass = () => {
  const { currentUser } = useAuth();
  const { user, isPending: isTeacherLoading } = useUserRole();
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClass, setTotalclass] = useState(null);

  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes", user?.userRole, pageSize, currentPage, totalClass],
    enabled: !isTeacherLoading,
    queryFn: async () => {
      const result = await axios.post(
        `/teachers/all-classes/${currentUser?.email}`,
        { pageSize, currentPage }
      );
      setTotalclass(result.data.totalClass);
      return result.data.data;
    },
  });

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this class?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        hanldeDeleteClass(id);
      },
    });
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const result = await axios.patch(
        `/teachers/update-class/${currentUser?.email}`,
        values
      );
      if (result.data.data) {
        message.success("Class has been updated!");
      } else {
        message.error("Failed to update, Try again!");
      }
    } catch (error) {
      message.error(
        error?.message || "Something went wrong, Please try again!"
      );
    } finally {
      setLoading(false);
      setIsUpdateModalOpen(false);
      refetch();
    }
  };

  const hanldeDeleteClass = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/teachers/delete-class/${id}`);
      const result = data.data;
      if (result.deletedCount > 0) {
        message.success("Successfully deleted the class!");
      } else {
        message.error("Operation failed, Please try agian!");
      }
    } catch (error) {
      message.error(
        error?.message || "An error has occured, Please try again!"
      );
    } finally {
      setLoading(false);
      refetch();
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primaryColor mb-6 mt-4">
        My Classes
      </h1>

      {classes.length === 0 && !isLoading ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card
              key={cls._id}
              className="dark:bg-slate-800"
              hoverable
              size={"small"}
              loading={isLoading}
              cover={
                <div className="relative h-52">
                  <img
                    className="rounded-md h-full w-full object-cover"
                    alt={cls.title}
                    src={cls.image}
                  />

                  <span className="absolute capitalize bottom-2 right-2 bg-primaryColor rounded-md px-3 py-1 text-sm text-lightGray">
                    {cls.status}
                  </span>
                </div>
              }
              actions={[
                <AntButton
                  key={cls._id}
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
                  key={cls._id}
                  type="link"
                  loading={loading}
                  disabled={loading}
                  danger
                  onClick={() => showDeleteConfirm(cls._id)}
                >
                  Delete
                </AntButton>,
                cls.status !== "pending" && cls.status !== "rejected" ? (
                  <Link
                    to={`/dashboard/my-class-details/${cls._id}`}
                    key={cls._id}
                    state={cls.title}
                  >
                    <AntButton className="text-primaryColor" type="link">
                      See Details
                    </AntButton>
                  </Link>
                ) : (
                  <AntButton
                    className="text-primaryColor"
                    key={cls._id}
                    type="link"
                    disabled
                  >
                    See Details
                  </AntButton>
                ),
              ]}
            >
              <h3 className="text-lg dark:text-lightGray font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                {cls.title}
              </h3>

              <p className="my-2 overflow-hidden dark:text-lightGray whitespace-nowrap text-ellipsis">
                {cls.description}
              </p>

              <div>
                <p className="dark:text-lightGray">
                  <strong>Name:</strong> {cls.name}
                </p>
                <p className="dark:text-lightGray">
                  <strong>Email:</strong> {cls.email}
                </p>
                <p className="dark:text-lightGray">
                  <strong>Price:</strong> ${cls.price}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-20">
        <Pagination
          align="center"
          current={currentPage}
          pageSize={pageSize}
          total={totalClass}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={[5, 10, 15]}
        />
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
                loading={loading}
                disabled={loading}
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
