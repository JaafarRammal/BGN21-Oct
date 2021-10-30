import { Stack } from "@mui/material";

export default function ExplorePage() {
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Stack>
  );
}

function Card() {
  return (
    <div className="card text-center" style={{ maxWidth: "800px", margin: "20px" }}>
      <div className="card-header">Featured</div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
      <div className="card-footer text-muted">2 days ago</div>
    </div>
  );
}
