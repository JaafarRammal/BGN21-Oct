import { Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ExplorePage() {
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
      <SwipeableCard />
      <SwipeableCard />
      <SwipeableCard />
      <SwipeableCard />
    </Stack>
  );
}

function SwipeableCard() {
  return (
    <Swiper slidesPerView={1} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>
        <Card />
      </SwiperSlide>
    </Swiper>
  );
}

function Card() {
  return (
    <div className="card text-center" style={{ maxWidth: "800px", margin: "20px 20px 10px 20px" }}>
      <div className="card-header">Featured</div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="/" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
      <div className="card-footer text-muted">2 days ago</div>
    </div>
  );
}
