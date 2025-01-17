import React, { useEffect, useState } from "react";
import { Table, Button, Input, Avatar, Modal, message } from "antd";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const usersData = [
  {
    id: 1,
    name: "Hasinur Rahman",
    email: "hasinur@gmail.com",
    image: "",
    role: "student",
  },
  {
    id: 2,
    name: "Rahman",
    email: "rahman@gmail.com",
    image: "",
    role: "admin",
  },
];

const Users = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");

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
      dataIndex: "image",
      key: "image",
      render: (image) => <Avatar src={image} size="large" />,
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
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Users;
