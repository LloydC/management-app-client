import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://delightful-flip-flops-ray.cyclic.app";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    return api.post(`${API_URL}/api/upload`, uploadData)
          .then(res => res.data)
          .then(response => {
            console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setImageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, imageUrl };
    
    const storedToken = localStorage.getItem('authToken');
 
    axios
      .post(
      `${API_URL}/api/projects`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } } // Send the token through the request "Authorization" Headers
    )
      .then((response) => {
      // Reset the state
      setTitle("");
      setDescription("");
      setImageUrl("");
      props.refreshProjects();
    })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddProject">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Image:</label>
        <input type="file" name="imageUrl" onChange={(e) => handleFileUpload(e)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;