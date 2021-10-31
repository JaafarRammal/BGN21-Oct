import { Stack } from "@mui/material";
import SwipeableCard from "../Components/SwipeableCard";

export default function ExplorePage() {
  return (
    <div className="container" style={{paddingTop: "20px"}}>
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
      <SwipeableCard />
    </Stack>
    </div>
  );
}
