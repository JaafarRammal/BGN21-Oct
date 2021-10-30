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
            contributors = {[
                {firstName: "Hello", lastName: "World"},
                {firstName: "Sam", lastName: "Smith"},
                {firstName: "Hello", lastName: "World"},
                {firstName: "Sam", lastName: "Smith"},
                {firstName: "Hello", lastName: "World"},
                {firstName: "Sam", lastName: "Smith"},
                {firstName: "Hello", lastName: "World"},
                {firstName: "Sam", lastName: "Smith"}
            ]}
          learning_outcomes = {[
              'Web Development',
              'Collaboration',
              'Team-building',
              'Pair-programming',
              'Scripting',
              'Database Management'
          ]}
            why_join_us = "We're a friendly Team with much to teach and much to learn. +\
            We'd love to take onboard a mentee to see this project through!"
        />
      </SwiperSlide>
    </Swiper>
  );
}
