import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

// FAQ Data
const faqs = [
  {
    question: "How can I become a teacher on EduTrial?",
    answer:
      "To become a teacher, you need to register and verify your email. After that, you can apply to be a teacher, and your application will be reviewed by our admin team. Once approved, you can start creating and managing your classes.",
  },
  {
    question: "What are the prerequisites for students to join a class?",
    answer:
      'Students must have an account on EduTrial and be logged in to enroll in any classes. You can browse through various classes, select one that fits your interests, and click the "Enroll" button to join.',
  },
  {
    question: "Is there a cost for accessing the classes?",
    answer:
      "EduTrial offers both free and paid courses. You can filter classes based on their price range. Payment for paid courses can be made through a secure payment gateway available on the platform.",
  },
  {
    question: "Can I track my progress in the courses?",
    answer:
      "Yes! EduTrial provides a dashboard where you can track your enrolled courses, view your progress, and access certificates upon completion of the course.",
  },
  {
    question: "What kind of support is available if I have questions?",
    answer:
      "We have a dedicated support team that can help you through live chat, email support, or a community forum. Visit the “Help” section on your dashboard for more details.",
  },
  {
    question: "How do I give feedback about a course?",
    answer:
      "Once you complete a course, you will be prompted to leave feedback. Your feedback helps improve the quality of our courses and assists other users in selecting the best ones.",
  },
  {
    question: "Can I collaborate with other teachers?",
    answer:
      "Yes, teachers can collaborate on course creation and co-teach. You can invite other educators to collaborate and create joint classes on the platform.",
  },
];

const { Panel } = Collapse;

const FAQSection = () => {
  return (
    <section className="faq-section py-14 bg-lightGray">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-darkGray mb-8">
          Frequently Asked Questions
        </h2>
        <Collapse
          defaultActiveKey={["0"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          accordion
        >
          {faqs.map((faq, index) => (
            <Panel
              header={faq.question}
              key={index}
              className="text-left text-lg bg-primaryColor"
            >
              <p className="text-muted">{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </section>
  );
};

export default FAQSection;
