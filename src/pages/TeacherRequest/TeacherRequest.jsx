import { useState } from "react";
import { Table, Button, Image, Tag, notification } from "antd";
import useTeachers from "../../hooks/useTeachers";
import useAxiosSecure from "../../axios/useAxiosSecure";
import useTheme from "../../hooks/useTheme";

const TeacherRequest = () => {
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalTeacher, setTotalTeacher] = useState(null);
  const { theme } = useTheme();

  const {
    teachers: requests,
    isTeacherLoading,
    refetch,
  } = useTeachers({ pageSize, currentPage, totalTeacher, setTotalTeacher });

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  // Approve request
  const handleApprove = async (email) => {
    try {
      setLoading(true);
      const { data } = await axios.patch("/admin/approve-teacher-request", {
        email,
      });
      if (data.data.modifiedCount) {
        notification.success({
          message: "Teacher request approved successfully!",
        });
        setLoading(false);
        refetch();
      } else {
        notification.error({
          message: "It seems the user is already a teacher!",
        });
        setLoading(false);
        refetch();
      }
    } catch (error) {
      notification.error({
        message: error.message || "Teacher request approved successfully!",
      });
    }
    setLoading(false);
  };

  // Reject request
  const handleReject = async (email) => {
    try {
      setLoading(true);
      const { data } = await axios.patch("/admin/reject-teacher-request", {
        email,
      });
      if (data.data.modifiedCount) {
        notification.warning({
          message: "Teacher request rejected successfully!",
        });
        refetch();
        setLoading(false);
      } else {
        notification.error({
          message: "Seems the request is already rejected!",
        });
      }
    } catch (error) {
      notification.error({
        message: error.message || "Operation failed, Please try again!",
      });
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "photoURL",
      key: "photoURL",
      render: (photoURL) => (
        <Image
          src={photoURL}
          alt="Teacher"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
      ),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "pending":
            color = "gold";
            break;
          case "accepted":
            color = "green";
            break;
          case "rejected":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            className="dark:text-lightGray"
            type="primary"
            onClick={() => handleApprove(record.email)}
            loading={loading}
            disabled={
              loading ||
              record.status === "approved" ||
              record.status === "rejected"
            }
          >
            Approve
          </Button>
          <Button
            className="dark:!text-lightGray"
            danger
            onClick={() => handleReject(record.email)}
            loading={loading}
            disabled={
              loading ||
              record.status === "approved" ||
              record.status === "rejected"
            }
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-primaryColor">
        Teacher Requests
      </h1>
      <Table
        dataSource={requests}
        columns={columns}
        loading={isTeacherLoading}
        rowKey="_id"
        bordered
        className={`overflow-x-auto ${theme === "dark" && "dark-mode-class"}`}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalTeacher,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15],
        }}
      />
    </div>
  );
};

export default TeacherRequest;
