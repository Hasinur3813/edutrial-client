import ClassCard from "../ClassCard/ClassCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../axios/useAxiosPublic";

const PopularCourses = () => {
  const axios = useAxiosPublic();

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const result = await axios.get("/users/homepage-classes");
      return result.data.data;
    },
  });

  return (
    <section className="bg-bg-secondary py-14">
      <div className="container lg:max-w-7xl mx-auto text-center px-3">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-primaryColor">
            Popular Courses
          </h2>
          <p className="text-base sm:text-lg text-muted">
            Explore our top-rated courses that students love the most! Join now
            to enhance your skills.
          </p>
        </div>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="  !p-10  mySwiper"
        >
          {classes.map((classes, index) => (
            <SwiperSlide key={index}>
              <ClassCard classes={classes} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularCourses;
