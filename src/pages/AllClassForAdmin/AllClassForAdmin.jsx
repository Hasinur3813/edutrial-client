import { Table, Button, Popconfirm, Tag, message } from "antd";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllClassForAdmin = () => {
  const axios = useAxiosSecure();
  const { user, isPending } = useUserRole();
  const [loading, setLoading] = useState(false);

  const { data: classes, refetch } = useQuery({
    queryKey: ["teachersClasses", user?.userRole],
    enabled: !isPending,
    queryFn: async () => {
      const result = await axios.get("/admin/teachers-classes");
      const allClass = result.data.data;
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

  const handleProgress = (id) => {
    // Navigate to class progress page
    console.log("Navigate to class progress for ID:", id);
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
            <Button type="danger" disabled={record.status === "rejected"}>
              {record?.status === "rejected" ? "Rejected" : "Reject"}
            </Button>
          </Popconfirm>
          <Link to={`/dashboard/my-class-details/${record._id}`}>
            <Button
              type="default"
              disabled={record.status !== "accepted"}
              onClick={() => handleProgress(record._id)}
            >
              Progress
            </Button>
          </Link>
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
        className="overflow-x-auto"
        size="small"
        dataSource={classes}
        columns={columns}
        rowKey="_id"
      />
    </div>
  );
};

export default AllClassForAdmin;
