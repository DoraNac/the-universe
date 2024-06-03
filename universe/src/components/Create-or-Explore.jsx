import React from "react";
import { Link } from "react-router-dom";
import "../styles/Create-or-Explore.css"

const CreateOrExplore = () => {
  return (
    <div className="main">
      <h2 className="quoteTitle">
      Thank you  for joining ///.  Start this journey by creating your universe or explore others
      </h2>
      <div className="buttonContainer">
        <Link to="/universe">
          {" "}
          <button className="corbutton">Create universe</button>
        </Link>
        <Link to="/exploreOthers">
          {" "}
          <button className="corbutton">Explore others</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateOrExplore;
