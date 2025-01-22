import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Fade } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../axios/useAxiosPublic";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa";

// const feedbacks = [
//   {
//     text: "EduTrial has been an amazing platform for sharing knowledge!",
//     name: "John Doe",
//     image: "https://via.placeholder.com/150",
//     title: "Introduction to Programming",
//   },
//   {
//     text: "I love the engagement and support from students!",
//     name: "Jane Smith",
//     image: "https://via.placeholder.com/150",
//     title: "Advanced Mathematics",
//   },
//   {
//     text: "I love the engagement and support from students!",
//     name: "Jane Smith",
//     image: "https://via.placeholder.com/150",
//     title: "Advanced Mathematics",
//   },
//   {
//     text: "I love the engagement and support from students!",
//     name: "Jane Smith",
//     image: "https://via.placeholder.com/150",
//     title: "Advanced Mathematics",
//   },
//   {
//     text: "I love the engagement and support from students!",
//     name: "Jane Smith",
//     image: "https://via.placeholder.com/150",
//     title: "Advanced Mathematics",
//   },
//   {
//     text: "I love the engagement and support from students!",
//     name: "Jane Smith",
//     image: "https://via.placeholder.com/150",
//     title: "Advanced Mathematics",
//   },
// ];

const Feedback = () => {
  const axios = useAxiosPublic();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data } = await axios.get("/users/feedbacks");
      console.log(data.data);
      return data.data;
    },
  });

  return (
    <section className="py-14 bg-offWhite">
      <div className="container mx-auto px-3 space-y-10">
        {/* Section Title */}
        <div className="text-center">
          <Fade duration={2000} direction="up">
            <h2 className="text-2xl md:text-3xl text-primaryColor lg:text-4xl font-extrabold  mt-2">
              What Our Students Say
            </h2>
          </Fade>
          <Fade duration={1600} direction="up">
            <p className="text-muted text-base sm:text-lg mt-4">
              Read what our students have to say about their experience with our
              teachers on EduTrial.
            </p>
          </Fade>
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
                <p className="text-muted text-sm italic mb-2 max-w-md">
                  {feedback.title}
                </p>
                <p className="text-muted text-center max-w-md">
                  {feedback.description}
                </p>
                <ReactStars
                  count={5}
                  size={30}
                  activeColor="#ffd700"
                  value={feedback.rating}
                  emptyIcon={<FaStar />}
                  filledIcon={<FaStar />}
                  disabled={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Feedback;
