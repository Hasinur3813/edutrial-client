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
