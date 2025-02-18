import {
  LineChart,
  Line,
  BarChart,
  Bar,
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

// Sample Data
const enrollmentData = [
  { month: "Jan", enrollments: 200 },
  { month: "Feb", enrollments: 300 },
  { month: "Mar", enrollments: 250 },
  { month: "Apr", enrollments: 400 },
  { month: "May", enrollments: 450 },
  { month: "Jun", enrollments: 500 },
];

const completionData = [
  { course: "Math", completed: 80 },
  { course: "Science", completed: 60 },
  { course: "History", completed: 90 },
];

const userDemographics = [
  { name: "Students", value: 70 },
  { name: "Users", value: 170 },
  { name: "Educators", value: 30 },
];
const COLORS = ["#00d2d3", "#00d3c4", "#000000"];

const Overview = () => {
  return (
    <div className="p-6 bg-[#f0f0f0] min-h-screen">
      <h1 className="text-3xl font-bold text-[#101c2c] mb-4">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <h3>Total Courses</h3>
          <p className="text-4xl font-bold text-[#00d2d3]">150</p>
        </Card>
        <Card>
          <h3>Enrolled Students</h3>
          <p className="text-4xl font-bold text-[#00d3c4]">3200</p>
        </Card>
        <Card>
          <h3>Completed Courses</h3>
          <p className="text-4xl font-bold text-[#ef4444]">980</p>
        </Card>
        <Card>
          <h3>Active Users</h3>
          <p className="text-4xl font-bold text-[#101c2c]">450</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#4b5563] mb-2">
            Enrollment Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
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
            Course Completion Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#00d3c4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#4b5563] mb-2">
            User Demographics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDemographics}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {userDemographics.map((entry, index) => (
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
