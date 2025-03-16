import { useQuery } from "@tanstack/react-query";
import { Table, Button } from "antd";
import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useTheme } from "@emotion/react";
// const payments = [
//   { id: 1, title: "Math Class", amount: "$50", transactionId: "TXN12345" },
//   { id: 2, title: "Science Class", amount: "$30", transactionId: "TXN67890" },
//   { id: 3, title: "English Class", amount: "$20", transactionId: "TXN11223" },
// ];

const PaymentHistory = () => {
  const { theme } = useTheme();
  console.log(theme);
  const { currentUser } = useAuth();
  const axios = useAxiosSecure();

  const { data: payments, isPending } = useQuery({
    queryKey: [currentUser],
    queryFn: async () => {
      const payments = await axios.get(`/users/payment-history/rana@gmail.com`);
      console.log(payments.data);
      return payments.data;
    },
  });
  //  {
  //   "date": "2025-01-23T02:24:58.692Z",
  //   "transactionId": "pi_3QkG6GJzZcvmIqrX0ij8AUKA",
  //   "class": {
  //     "id": "6791a06100da19e0f3c5857f",
  //     "title": "Mastering Web Development",
  //     "instructor": "Ab. Rahman",
  //     "price": 15
  //   }
  // },

  const columns = [
    { title: "Class Title", dataIndex: ["class", "title"], key: "title" },
    {
      title: "Amount",
      dataIndex: ["class", "price"],
      key: "amount",
      render: (price) => `$${price}`,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Purchased At",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
  ];

  const downloadPDF = () => {
    console.log("pdf download");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <Table
        className={`${theme === "dark" && "dark-mode-class"} overflow-x-auto`}
        dataSource={payments}
        columns={columns}
        rowKey="date"
        pagination={false}
      />
      <Button onClick={downloadPDF} type="primary" className="mt-4">
        Download as PDF
      </Button>
    </div>
  );
};

export default PaymentHistory;
