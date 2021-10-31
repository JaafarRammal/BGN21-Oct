import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectCard from "../Components/ProjectCard";
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

export default function SwipeableCard() {
  const [direction, setDirection] = useState(DIRECTION.UNKNOWN);
  const dummy_project: Project = {
    title: "The Spottify Project",
    description: "A little description about the project and how it will help you understand the fundamentals of x technology and y engineering principles.",
    date: new Date().toISOString().split("T")[0],
    languages: ["Python", "Java", "Rust"],
    tags: ["Fullstack", "WebApp"],
    contributor_ids: [],
    learning_outcomes: ["Web Development", "Collaboration", "Team-building", "Pair-programming", "Scripting", "Database Management"],
    why_join: "We're a friendly Team with much to teach and much to learn. +We'd love to take onboard a mentee to see this project through!",
    duration: 20,
    hours: 20,
    likedBy: [],
    owner_id: "0KOlZSoDTsnHVQUAfcwV",
    resources: [],
  };
  return (
    <Swiper slidesPerView={1} onSliderMove={(move) => setDirection(getDirection(move))}>
      <SwiperSlide>
        <ProjectCard project={dummy_project} popover={true}/>
      </SwiperSlide>
      {direction}
    </Swiper>
  );
}
