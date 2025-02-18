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

const Feedback = () => {
  const axios = useAxiosPublic();

  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data } = await axios.get("/users/feedbacks");

      return data.data;
    },
  });

  return (
    <section className="py-14 bg-offWhite dark:bg-darkGray">
      <div className="container mx-auto px-3 space-y-10">
        {/* Section Title */}
        <div className="text-center">
          <Fade duration={2000} direction="up">
            <h2 className="text-2xl md:text-3xl text-primaryColor lg:text-4xl font-extrabold  mt-2">
              What Our Students Say
            </h2>
          </Fade>
          <Fade duration={1600} direction="up">
            <p className="text-muted dark:text-lightGray text-base sm:text-lg mt-4">
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
              <div className="bg-white dark:bg-slate-800 px-8 py-12 rounded-lg shadow-md flex flex-col items-center">
                <img
                  src={feedback.image}
                  alt={feedback.name}
                  className="w-20 h-20 object-cover rounded-full shadow-md mb-4"
                />
                <h3 className="text-lg dark:text-primaryColor font-bold text-darkGray">
                  {feedback.name}
                </h3>
                <p className="text-muted dark:text-lightGray text-sm italic mb-2 max-w-md">
                  {feedback.title}
                </p>
                <p className="text-muted dark:text-lightGray text-center max-w-md">
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
