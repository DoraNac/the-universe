import React, { useState } from "react";
import { createUniverse } from "../services/apis";
import "../styles/Create-Universe-Form.css";

const CreateUniverse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundURL, setBackgroundURL] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || (!backgroundFile && !backgroundURL)) {
      setError("Name, description, and background image are required.");
      return;
    }

    try {
      const background = backgroundURL || backgroundFile.name;
      const data = await createUniverse(name, description, background);

      setSuccessMessage(data.message);
      setError(null); 
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null); 
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBackgroundFile(file);
  };

  const handleURLChange = (e) => {
    setBackgroundURL(e.target.value);
  };

  return (
    <div className="createUniverseContainer">
      <div className="UniverseForm">
        <h2>Create your universe</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <p>Universe name</p>
          <input
            type="text"
            placeholder="Name of your universe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Universe description</p>
          <input
            type="text"
            placeholder="Description of your universe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Universe background</p>
          <p>Import file</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>Or enter URL</p>
          <input
            type="text"
            placeholder="Enter image URL"
            value={backgroundURL}
            onChange={handleURLChange}
          />
          <button type="submit">Create universe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUniverse;
