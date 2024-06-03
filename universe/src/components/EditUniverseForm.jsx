import React, { useState, useEffect } from "react";
import { updateUniverse } from "../services/apis";
import { useNavigate } from "react-router-dom";
import "../styles/Create-Universe-Form.css";

const EditUniverse = ({ universe, onUpdate }) => {
  const [name, setName] = useState(universe.titleUniverse);
  const [description, setDescription] = useState(universe.descriptionUniverse);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundURL, setBackgroundURL] = useState(
    universe.backgroundUniverse || ""
  );
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setName(universe.titleUniverse);
    setDescription(universe.descriptionUniverse);
    setBackgroundURL(universe.backgroundUniverse || "");
  }, [universe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || (!backgroundFile && !backgroundURL)) {
      setError("Name, description, and background image are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titleUniverse", name);
      formData.append("descriptionUniverse", description);
      if (backgroundFile) {
        formData.append("backgroundUniverse", backgroundFile);
      } else {
        formData.append("backgroundUniverse", backgroundURL);
      }

      // Log the form data entries
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const updatedUniverse = await updateUniverse(universe.id, formData);
      onUpdate(updatedUniverse);
      setSuccessMessage("Universe edited successfully");

      // Redirect to user profile with updated universe details
      navigate(`/universe/${universe.id}`);
      // location.reload();
    } catch (error) {
      setError(error.message);
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
        <h2>Edit your universe</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <h3>Universe name</h3>
          <input
            type="text"
            placeholder="Name of your universe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h3>Universe description</h3>
          <input
            type="text"
            placeholder="Description of your universe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h3>Universe background</h3>
          <p>Import file</p>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <p>Or enter URL</p>
          <input
            type="text"
            placeholder="Enter image URL"
            value={backgroundURL}
            onChange={handleURLChange}
          />
          <button type="submit">Edit universe</button>
        </form>
      </div>
    </div>
  );
};

export default EditUniverse;
