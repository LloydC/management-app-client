import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function ProjectCard ( { title, description, imageUrl, _id } ) {
  
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${_id}`}>
        <h3>{title}</h3>
      </Link>
      {imageUrl && <img src={imageUrl} alt={'project_image'} style={{width: '200px', height: '200px'}}/>}
      <p style={{ maxWidth: "400px" }}>{description} </p>
    </div>
  );
}

export default ProjectCard;