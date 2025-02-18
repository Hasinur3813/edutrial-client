import { Table, Button, Popconfirm, message } from "antd";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../axios/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const AllClassForAdmin = () => {
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalClass, setTotalClass] = useState(null);
  const { theme } = useTheme();

  const {
    data: classes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teachersClasses", currentPage, pageSize, totalClass],
    queryFn: async () => {
      const result = await axios.get(
        `/admin/teachers-classes?page=${currentPage}&limit=${pageSize}`
      );
      const allClass = result.data.data;
      setTotalClass(result.data.totalClasses);
      return allClass;
    },
  });
  const handleApprove = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/admin/approve-teacher-class/${id}`);
      const result = data;
      if (result.success) {
        message.success("The class has been accepted!");
      } else {
        message.error("Something went wrong, Please try later!");
      }
    } catch (error) {
      message.error(
        error?.message || "Something went wrong, Please try later!"
      );
    } finally {
      setLoading(false);
      refetch();
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/admin/reject-teacher-class/${id}`);
      const result = data;
      if (result.success) {
        message.success("The class has been rejected!");
      } else {
        message.error("Something went wrong, Please try later!");
      }
    } catch (error) {
      message.error(
        error?.message || "Something went wrong, Please try later!"
      );
    } finally {
      setLoading(false);
      refetch();
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="class"
          className="w-16 h-16 rounded object-cover"
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => <span>{desc.slice(0, 50)}...</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            className="dark:text-lightGray"
            disabled={
              record.status === "accepted" ||
              record.status === "rejected" ||
              loading
            }
            onClick={() => handleApprove(record._id)}
          >
            {record?.status === "accepted" ? "Accepted" : "Approve"}
          </Button>
          <Popconfirm
            title="Are you sure to reject this class?"
            onConfirm={() => handleReject(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="dark:text-lightGray"
              type="danger"
              disabled={record.status === "rejected"}
            >
              {record?.status === "rejected" ? "Rejected" : "Reject"}
            </Button>
          </Popconfirm>
          {record.status !== "accepted" ? (
            <Button className="dark:text-lightGray" type="default" disabled>
              Progress
            </Button>
          ) : (
            <Link to={`/dashboard/my-class-details/${record._id}`}>
              <Button type="default">Progress</Button>
            </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 overflow-x-hidden">
      <h2 className="my-10 text-2xl md:text-3xl lg:text-4xl text-primaryColor font-bold">
        User Classes
      </h2>
      <Table
        className={`${theme === "dark" && "dark-mode-class"} overflow-x-auto`}
        size="small"
        dataSource={classes}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalClass,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15],
        }}
      />
    </div>
  );
};

export default AllClassForAdmin;
