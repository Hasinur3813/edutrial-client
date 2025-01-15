import ClassCard from "../ClassCard/ClassCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const classes = [2, 3, 4, 3, 4, 3, 3, 4];

const PopularCourses = () => {
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
              slidesPerView: 2, // For screens >= 640px
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3, // For screens >= 768px
              spaceBetween: 30,
            },
          }}
          className="  !p-10  mySwiper"
        >
          {classes.map((feedback, index) => (
            <SwiperSlide key={index}>
              <ClassCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularCourses;
