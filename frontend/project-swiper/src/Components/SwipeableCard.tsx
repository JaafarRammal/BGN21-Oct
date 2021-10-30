import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "../Components/ProjectCard";

export default function SwipeableCard() {
  return (
    <Swiper slidesPerView={1} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>
        <ProjectCard
            title="The Spottify Project"
            description="A little description about the project and how it will help
            you understand the fundamentals of x technology and y engineering principles."
            date = {new Date().toISOString().split('T')[0]}
            languages = {['Python','Java','Rust']}
            tags = {['Fullstack','WebApp']}
        />
      </SwiperSlide>
    </Swiper>
  );
}
