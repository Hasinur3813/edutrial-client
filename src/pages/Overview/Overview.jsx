import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "antd";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../axios/useAxiosSecure";
import Loader from "../../component/Loader/Loader";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const Overview = () => {
  const axios = useAxiosSecure();

  const { data: overviewData, isLoading } = useQuery({
    queryKey: ["overviewData"],
    queryFn: async () => {
      const res = await axios.get("/admin/statistics");
      console.log(res.data.data);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-offWhite dark:bg-darkGray min-h-screen">
      <h1 className="text-3xl font-bold text-text dark:text-lightGray mb-4">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <h3>Total Classes</h3>
          <p className="text-4xl font-bold text-primaryColor">
            {overviewData.totalClasses}
          </p>
        </Card>
        <Card>
          <h3>Enrolled Students</h3>
          <p className="text-4xl font-bold text-primaryColor">
            {overviewData.totalEnrollments}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#4b5563] mb-2">
            Enrollment Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overviewData.enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="enrollments" stroke="#00d2d3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#4b5563] mb-2">
            User Demographics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={overviewData.userDemographics}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {overviewData.userDemographics.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
