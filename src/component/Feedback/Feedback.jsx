import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const feedbacks = [
  {
    text: "EduTrial has been an amazing platform for sharing knowledge!",
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    title: "Introduction to Programming",
  },
  {
    text: "I love the engagement and support from students!",
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    title: "Advanced Mathematics",
  },
  {
    text: "I love the engagement and support from students!",
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    title: "Advanced Mathematics",
  },
  {
    text: "I love the engagement and support from students!",
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    title: "Advanced Mathematics",
  },
  {
    text: "I love the engagement and support from students!",
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    title: "Advanced Mathematics",
  },
  {
    text: "I love the engagement and support from students!",
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    title: "Advanced Mathematics",
  },
];

const Feedback = () => {
  return (
    <section className="py-14 bg-lightGray">
      <div className="container mx-auto px-3 space-y-10">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl text-primaryColor lg:text-4xl font-extrabold  mt-2">
            What Our Teachers Say
          </h2>
          <p className="text-muted text-base sm:text-lg mt-4">
            Read what our teachers have to say about their experience on
            EduTrial.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          navigation={true}
          className="mt-10  mySwiper"
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white px-8 py-12 rounded-lg shadow-md flex flex-col items-center">
                <img
                  src={feedback.image}
                  alt={feedback.name}
                  className="w-20 h-20 rounded-full shadow-md mb-4"
                />
                <h3 className="text-lg font-bold text-darkGray">
                  {feedback.name}
                </h3>
                <p className="text-muted text-sm italic mb-2">
                  {feedback.title}
                </p>
                <p className="text-muted text-center">{feedback.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedback;
