import { useState } from "react";
import { Table, Button, Image, Tag, notification } from "antd";

const TeacherRequest = () => {
  // Mock data for teacher requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      image:
        "https://th.bing.com/th?id=OIP.XIHKbawz2fk_9bU9wqDJuwHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      experience: "5 years",
      title: "Math Teacher",
      category: "Mathematics",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      image:
        "https://th.bing.com/th?id=OIP.XIHKbawz2fk_9bU9wqDJuwHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      experience: "3 years",
      title: "Science Teacher",
      category: "Science",
      status: "rejected",
    },
    {
      id: 3,
      name: "Sam Wilson",
      image:
        "https://th.bing.com/th?id=OIP.XIHKbawz2fk_9bU9wqDJuwHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      experience: "7 years",
      title: "English Teacher",
      category: "English",
      status: "pending",
    },
    {
      id: 4,
      name: "Sam Wilson",
      image:
        "https://th.bing.com/th?id=OIP.XIHKbawz2fk_9bU9wqDJuwHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      experience: "7 years",
      title: "English Teacher",
      category: "English",
      status: "pending",
    },
    {
      id: 5,
      name: "Sam Wilson",
      image:
        "https://th.bing.com/th?id=OIP.XIHKbawz2fk_9bU9wqDJuwHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      experience: "7 years",
      title: "English Teacher",
      category: "English",
      status: "pending",
    },
  ]);

  // Approve request
  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req))
    );
    notification.success({ message: "Teacher request approved successfully!" });
  };

  // Reject request
  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
    notification.warning({ message: "Teacher request rejected successfully!" });
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
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <Image
          src={src}
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
            type="primary"
            onClick={() => handleApprove(record.id)}
            disabled={
              record.status === "accepted" || record.status === "rejected"
            }
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => handleReject(record.id)}
            disabled={
              record.status === "accepted" || record.status === "rejected"
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
        rowKey="id"
        bordered
        pagination={{ pageSize: 20 }}
        className="overflow-x-auto"
      />
    </div>
  );
};

export default TeacherRequest;
