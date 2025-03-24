import Banner from "../../component/Banner/Banner";
import Feedback from "../../component/Feedback/Feedback";
import JoinAsTeacher from "../../component/JoinAsTeacher/JoinAsTeacher";
import PartnersSection from "../../component/PartnersSection/PartnersSection";
import PopularCourses from "../../component/PopularClasses/PopularClasses";
import StatsSection from "../../component/StatsSection/StatsSection";
import WhyJoinUs from "../../component/WhyJoinUs/WhyJoinUs";
import FAQSection from "../../component/FAQSection/FAQSection";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <StatsSection />
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
