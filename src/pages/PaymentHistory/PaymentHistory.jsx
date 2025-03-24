import { useQuery } from "@tanstack/react-query";
import { Table, Button } from "antd";
import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../axios/useAxiosSecure";
import useTheme from "../../hooks/useTheme";

const PaymentHistory = () => {
  const { theme } = useTheme();

  const { currentUser } = useAuth();
  const axios = useAxiosSecure();

  const { data: payments } = useQuery({
    queryKey: [currentUser],
    queryFn: async () => {
      const payments = await axios.get(`/users/payment-history/rana@gmail.com`);
      console.log(payments.data);
      return payments.data;
    },
  });

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
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-darkGray shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 dark:text-lightGray">
        Payment History
      </h2>
      <Table
        className={`${theme === "dark" && "dark-mode-class"} overflow-x-auto`}
        dataSource={payments}
        columns={columns}
        rowKey="date"
        pagination={false}
      />
      <Button onClick={downloadPDF} type="primary" className="mt-4 hidden">
        Download as PDF
      </Button>
    </div>
  );
};

export default PaymentHistory;
