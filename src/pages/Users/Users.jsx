import { useState } from "react";
import { Table, Button, Input, Avatar, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../axios/useAxiosSecure";

const Users = () => {
  const { user, isPending } = useUserRole();
  const [displayedUser, setDisplayedUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    data: users = [],
    isPending: isUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user.userRole],
    enabled: !isPending,
    queryFn: async () => {
      const result = await axios.get("/admin/all-users");
      return result.data.data;
    },
  });

  const handleSearch = async (e) => {
    const value = e.target.value;
    try {
      setSearching(true);
      const { data } = await axios.get(`admin/users/?search=${value}`);
      const users = data.data;
      setDisplayedUsers(users);
      setSearching(false);
    } catch {
      notification.error("Something went wrong, Please try again.");
      setSearching(false);
    }
  };

  // Handle Make Admin
  const handleMakeAdmin = async (email) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(`/admin/make-admin/${email}`);
      if (data.data.modifiedCount) {
        notification.success("The user role is changed to Admin");
        refetch();
        setLoading(false);
      } else {
        notification.error("Faild to make admin. Try again!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notification.error(
        error?.message || "An error occured making admin, Try again!"
      );
    }
  };

  const showAdminConfirm = (user) => {
    Modal.confirm({
      title: `Are you sure you want to make "${user.name}" as Admin?`,
      icon: <ExclamationCircleOutlined />,
      content: "After this the user role will be Admin.",
      okText: "Make Admin",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        handleMakeAdmin(user.email);
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
          onClick={() => showAdminConfirm(record)}
          disabled={loading || record.role === "admin"}
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
        // onSearch={(value) => handleSearch(value)}
        enterButton
        onInput={(e) => handleSearch(e)}
        size="large"
        allowClear
        className="mb-4"
      />
      {/* Users Table */}
      <Table
        className="overflow-x-auto"
        dataSource={displayedUser.length === 0 ? users : displayedUser}
        columns={columns}
        loading={isUsersLoading || searching}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Users;
