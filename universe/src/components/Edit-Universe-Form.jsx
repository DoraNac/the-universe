import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { createUniverse } from "../services/api";
import "../styles/Create-Universe-Form.css";

const EditUniverse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState(null); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !background) {
      setError("Name, description, and background image are required.");
      return;
    }

    try {
    
    //   console.log(background);

      // Call the API to create the universe
   
      
      setSuccessMessage("Universe edited successfully");
      setTimeout(() => {
     
        window.location.href = "";
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBackground(file);
  };

  return (
    <div className="createUniverseContainer">
      <div className="UniverseForm">
        <h2>Edit your universe</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
          />
          <button type="submit">Edit universe</button>
        </form>
      </div>
    </div>
  );
};

export default EditUniverse;