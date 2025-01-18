import { useState } from "react";
import { Table, Button, Input, Avatar, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../axios/useAxiosSecure";

const Users = () => {
  const { user, isPending } = useUserRole();
  // const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const axios = useAxiosSecure();

  const {
    data: users,
    isPending: isUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !isPending && user.userRole === "admin",
    queryFn: async () => {
      const result = await axios.get("/admin/all-users");
      return result.data.data;
    },
  });

  console.log(users);

  // Handle Make Admin
  const handleMakeAdmin = async (userId) => {
    console.log(userId);
  };

  const fetchUsers = (value) => {
    console.log(value);
  };
  const showDeleteConfirm = (user) => {
    Modal.confirm({
      title: `Are you sure you want to make "${user.name}" as Admin?`,
      icon: <ExclamationCircleOutlined />,
      content: "After this the user role will be Admin.",
      okText: "Make Admin",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        // To do
        // make admin logic hare
        message.success("User now admin!");
      },
    });
  };

  // Columns for Ant Design Table
  const columns = [
    {
      title: "User Image",
      dataIndex: "photoURL",
      key: "photoURL",
      render: (photoURL) => <Avatar src={photoURL} size="large" />,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => showDeleteConfirm(record)}
          disabled={record.role === "admin"}
        >
          {record.role === "admin" ? "Admin" : "Make Admin"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 overflow-x-hidden mt-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-primaryColor font-bold mb-4">
        Users Management
      </h1>
      {/* Search Input */}
      <Input.Search
        placeholder="Search users by name or email"
        onSearch={(value) => fetchUsers(value)}
        enterButton
        size="large"
        allowClear
        className="mb-4"
      />
      {/* Users Table */}
      <Table
        className="overflow-x-auto"
        dataSource={users}
        columns={columns}
        loading={isUsersLoading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Users;
