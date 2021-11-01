import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "../Components/ProjectCard";
import { getCurrentUserID, likeProject } from "../Helpers/Firebase";
import { Project } from "../Helpers/Project";

enum DIRECTION {
  LEFT,
  RIGHT,
  UNKNOWN,
}

function getDirection(swiperEvent: any): DIRECTION {
  // TODO: catch exception if library breaks
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

export default function SwipeableCard(props: any) {
  const project: Project = props.project;
  const [direction, setDirection] = useState(DIRECTION.UNKNOWN);
  return (
    <Swiper
      slidesPerView={1}
      onSliderMove={(move) => {
        setDirection(getDirection(move));
        if (getDirection(move) === DIRECTION.RIGHT) likeProject(getCurrentUserID(), project.id);
        console.log(getDirection(move) === DIRECTION.RIGHT)
      }}
    >
      <SwiperSlide>
        <ProjectCard project={project} popover={true} />
      </SwiperSlide>
    </Swiper>
  );
}
