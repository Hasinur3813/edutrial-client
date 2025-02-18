import { FaUsers, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import stats from "../../assets/stats.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../axios/useAxiosPublic";
import { Fade, Slide } from "react-awesome-reveal";

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
    <section className="py-14 bg-offWhite dark:bg-darkGray">
      <div className="container mx-auto px-3">
        {/* Heading Title */}

        <div className="text-center mb-6">
          <Fade duration={2000} derection="up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primaryColor mb-4">
              Explore Our Impact
            </h2>
          </Fade>
          <Fade duration={1600} derection="up">
            <p className="text-muted dark:text-lightGray text-lg">
              A glimpse into how EduTrial is transforming education.
            </p>
          </Fade>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left Section: Cards */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Total Users Card */}
            <Slide duration={500} direction="up">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex items-center gap-4">
                <div className="p-4 bg-primaryColor rounded-full text-white">
                  <FaUsers className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-darkGray dark:text-lightGray">
                    {statsData?.totalUsers || 0}
                  </h2>
                  <p className="text-muted dark:text-lightGray">Total Users</p>
                </div>
              </div>
            </Slide>

            {/* Total Classes Card */}
            <Slide duration={700} direction="up">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex items-center gap-4">
                <div className="p-4  bg-primaryColor rounded-full text-white">
                  <FaChalkboardTeacher className="text-2xl" />
                </div>
                <div>
                  <h2 className="dark:text-lightGray text-3xl font-bold text-darkGray">
                    {statsData?.totalClasses || 0}
                  </h2>
                  <p className="text-muted dark:text-lightGray">
                    Total Classes
                  </p>
                </div>
              </div>
            </Slide>
            {/* Total Enrollments Card */}
            <Slide duration={900} direction="up">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex items-center gap-4">
                <div className="p-4 bg-primaryColor rounded-full text-white">
                  <FaGraduationCap className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-darkGray dark:text-lightGray">
                    {statsData?.totalEnrollments || 0}
                  </h2>
                  <p className="text-muted dark:text-lightGray">
                    Total Enrollments
                  </p>
                </div>
              </div>
            </Slide>
          </div>

          {/* Right Section: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Fade duration={1000}>
              <img src={stats} alt="Educational Impact" />
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
