import { Stack } from "@mui/material";
import SwipeableCard from "../Components/SwipeableCard";

export default function ExplorePage() {
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
      <SwipeableCard />
    </Stack>
  );
}
