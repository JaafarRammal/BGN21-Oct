export default function ProjectCard(props: any) {
  const { title, description } = props;

  return (
    <div className="card text-center" style={{ maxWidth: "800px", margin: "20px 20px 10px 20px" }}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">{description}</p>
        <a href="/" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
      <div className="card-footer text-muted">2 days ago</div>
    </div>
  );
}
