import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Tag } from "antd";
import axios from "axios";

const classesData = [
  {
    id: "1",
    title: "Beginner JavaScript",
    image: "https://via.placeholder.com/150",
    email: "teacher1@example.com",
    description: "An introductory course to JavaScript programming.",
    status: "pending", // Change to "accepted" or "rejected" for testing
  },
  {
    id: "2",
    title: "Advanced React",
    image: "https://via.placeholder.com/150",
    email: "teacher2@example.com",
    description:
      "A deep dive into React hooks, state management, and performance optimization.",
    status: "accepted",
  },
  {
    id: "3",
    title: "Data Structures and Algorithms",
    image: "https://via.placeholder.com/150",
    email: "teacher3@example.com",
    description:
      "Learn the essential data structures and algorithms for problem-solving.",
    status: "rejected",
  },
  {
    id: "4",
    title: "Web Development Bootcamp",
    image: "https://via.placeholder.com/150",
    email: "teacher4@example.com",
    description:
      "Comprehensive training on HTML, CSS, JavaScript, and backend development.",
    status: "pending",
  },
  {
    id: "5",
    title: "Machine Learning Basics",
    image: "https://via.placeholder.com/150",
    email: "teacher5@example.com",
    description:
      "Understand the fundamentals of machine learning and build your first models.",
    status: "accepted",
  },
];

const AllClass = () => {
  const [classes, setClasses] = useState(classesData);

  const handleApprove = (id) => {
    axios.patch(`/api/classes/${id}`, { status: "accepted" }).then(() => {
      setClasses((prev) =>
        prev.map((cls) =>
          cls.id === id ? { ...cls, status: "accepted" } : cls
        )
      );
    });
  };

  const handleReject = (id) => {
    axios.patch(`/api/classes/${id}`, { status: "rejected" }).then(() => {
      setClasses((prev) =>
        prev.map((cls) =>
          cls.id === id ? { ...cls, status: "rejected" } : cls
        )
      );
    });
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
      render: (image) => <img src={image} alt="Class" className="w-16 h-16" />,
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
            disabled={record.status === "accepted"}
            onClick={() => handleApprove(record.id)}
          >
            Approve
          </Button>
          <Popconfirm
            title="Are you sure to reject this class?"
            onConfirm={() => handleReject(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" disabled={record.status === "rejected"}>
              Reject
            </Button>
          </Popconfirm>
          <Button
            type="default"
            disabled={record.status !== "accepted"}
            onClick={() => handleProgress(record.id)}
          >
            Progress
          </Button>
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
        rowKey="id"
      />
    </div>
  );
};

export default AllClass;
