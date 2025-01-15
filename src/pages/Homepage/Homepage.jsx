import Banner from "../../component/Banner/Banner";
import FAQSection from "../../component/FaqSection/FaqSection";
import Feedback from "../../component/Feedback/Feedback";
import JoinAsTeacher from "../../component/JoinAsTeacher/JoinAsTeacher";
import PartnersSection from "../../component/PartnersSection/PartnersSection";
import PopularCourses from "../../component/PopularClasses/PopularClasses";
import StatsSection from "../../component/StatsSection/StatsSection";
import WhyJoinUs from "../../component/WhyJoinUs/WhyJoinUs";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <StatsSection
        totalUsers="1,250"
        totalClasses="50"
        totalEnrollments="3,400"
      />
      <PopularCourses />
      <JoinAsTeacher />
      <WhyJoinUs />
      <Feedback />
      <PartnersSection />
      <FAQSection />
    </div>
  );
};

export default Homepage;
