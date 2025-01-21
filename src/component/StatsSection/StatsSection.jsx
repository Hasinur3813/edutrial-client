import { FaUsers, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import stats from "../../assets/stats.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../axios/useAxiosPublic";

const StatsSection = () => {
  const axios = useAxiosPublic();
  const { data: statsData } = useQuery({
    queryKey: ["homepage-stats"],
    queryFn: async () => {
      const result = await axios.get("/users/homepage-stats");
      return result.data.data;
    },
  });
  return (
    <section className="py-14 bg-offWhite">
      <div className="container mx-auto px-3">
        {/* Heading Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primaryColor mb-4">
            Explore Our Impact
          </h2>
          <p className="text-muted text-lg">
            A glimpse into how EduTrial is transforming education.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left Section: Cards */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Total Users Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
              <div className="p-4 bg-[#00d2d3] rounded-full text-white">
                <FaUsers className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-darkGray">
                  {statsData?.totalUsers || 0}
                </h2>
                <p className="text-muted">Total Users</p>
              </div>
            </div>

            {/* Total Classes Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
              <div className="p-4 bg-[#00d3c4] rounded-full text-white">
                <FaChalkboardTeacher className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-darkGray">
                  {statsData?.totalClasses || 0}
                </h2>
                <p className="text-muted">Total Classes</p>
              </div>
            </div>

            {/* Total Enrollments Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
              <div className="p-4 bg-[#ef4444] rounded-full text-white">
                <FaGraduationCap className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-darkGray">
                  {statsData?.totalEnrollments || 0}
                </h2>
                <p className="text-muted">Total Enrollments</p>
              </div>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={stats} alt="Educational Impact" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
