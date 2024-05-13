import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { createUniverse } from "../services/api";
import "../styles/Create-Universe-Form.css";

const CreateUniverse = () => {
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
   
      
      setSuccessMessage("Universe created successfully");
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
          <input
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
          />
          <button type="submit">Create universe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUniverse;































//     "https://media.istockphoto.com/id/1461048693/vector/background-with-stars-vector-pattern-night-sky-filled-with-lots-of-stars-boho-star-universe.jpg?s=612x612&w=0&k=20&c=ro9UOVAl3-fhW5a_9NNhsqsBf8AgMI6XM_5KJsW8gro=",
//     "https://hubblesite.org/files/live/sites/hubble/files/home/science/galaxies/_images/STScI-H-galaxies-0639a-2400x1200.jpg",
//     "https://img.freepik.com/premium-vector/green-rays-pop-art-background-s-s-vintage-kitsch_158415-389.jpg",
//     "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0bedb362-1325-47fe-8fb8-8a1224de0221/ddv2vkc-350553eb-6678-4518-baac-a5903c8e1f18.png/v1/fill/w_1280,h_720,q_80,strp/2000s_wallpaper_by_sailortrekkie92_ddv2vkc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMGJlZGIzNjItMTMyNS00N2ZlLThmYjgtOGExMjI0ZGUwMjIxXC9kZHYydmtjLTM1MDU1M2ViLTY2NzgtNDUxOC1iYWFjLWE1OTAzYzhlMWYxOC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.EjlVeWM1lf3ZT5aFSu6GRd3yU4sf2EdEvNHdHhLgrUA",
//     "https://static.vecteezy.com/system/resources/previews/016/122/965/original/emo-and-goth-checkered-seamless-patterns-with-skulls-2000s-black-and-white-background-retro-90s-00s-aesthetic-vector.jpg",
//     "https://static.vecteezy.com/system/resources/previews/012/251/413/non_2x/psychedelic-y2k-background-2000-illustration-in-retro-aesthetic-1990-style-vector.jpg",
//     "",
//     "https://images.foxtv.com/static.fox5atlanta.com/www.fox5atlanta.com/content/uploads/2023/11/932/524/Galaxy-cluster.jpg?ve=1&tl=1",
//     "https://png.pngtree.com/background/20231206/original/pngtree-kitsch-floral-pattern-wallpaper-with-roses-kitsch-rose-digital-photo-picture-image_6713775.jpg",
//     "https://cdn.mos.cms.futurecdn.net/hCXYB5YKXzdq2WEHYEe36d-1200-80.jpg",
//     "https://png.pngtree.com/thumb_back/fh260/background/20220606/pngtree-colorful-circles-background-pop-art-retro-vector-illustration-vintage-kitsch-image_1403823.jpg",
//     "https://img.freepik.com/premium-vector/yellow-pop-art-background-kitsch-vintage-s-s-style_158415-342.jpg",
//     "https://upload.wikimedia.org/wikipedia/commons/8/8b/A_Friend_in_Need_1903_C.M.Coolidge.jpg",

 