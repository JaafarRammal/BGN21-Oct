import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "../Components/ProjectCard";

enum DIRECTION {
  LEFT,
  RIGHT,
  UNKNOWN,
}

function getDirection(swiperEvent: any): DIRECTION {
  const direction = Object.entries(swiperEvent)[60][1];
  switch (direction) {
    case "next":
      return DIRECTION.LEFT;
    case "prev":
      return DIRECTION.RIGHT;
    default:
      return DIRECTION.UNKNOWN;
  }
}

export default function SwipeableCard() {
  const [direction, setDirection] = useState(DIRECTION.UNKNOWN);
  return (
    <Swiper slidesPerView={1} onSliderMove={(move) => setDirection(getDirection(move))}>
      <SwiperSlide>
        <ProjectCard title="Custom title" description="A little description" />
        {direction === 0 ? "LEFT" : "RIGHT"}
      </SwiperSlide>
    </Swiper>
  );
}
