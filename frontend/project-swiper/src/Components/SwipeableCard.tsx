import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "../Components/ProjectCard";

export default function SwipeableCard() {
  return (
    <Swiper slidesPerView={1} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>
        <ProjectCard title="Custom title" description="A little description" />
      </SwiperSlide>
    </Swiper>
  );
}
