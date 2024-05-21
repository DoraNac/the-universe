import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUniverse, getAllUniverses } from "../services/apis";

const CreateUniverse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundURL, setBackgroundURL] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      const response = await createUniverse(formData);

      if (response.message !== "This is your universe") {
        throw new Error("Failed to create universe");
      }

      // Fetch all universes to find the newly created one
      const universes = await getAllUniverses();
      const createdUniverse = universes.find(universe =>
        universe.titleUniverse === name &&
        universe.descriptionUniverse === description
      );

      if (createdUniverse) {
        navigate(`/universe/${createdUniverse.id}`);
      } else {
        throw new Error("Newly created universe not found");
      }
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
        <h2>Create your universe</h2>
        {error && <p className="error-message">{error}</p>}
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
            onChange={(e) => handleURLChange(e)}
          />
          <button type="submit">Create universe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUniverse;
