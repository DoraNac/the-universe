import React from "react";
import { Link } from "react-router-dom";

const CreateOrExplore = () => {
  return (
    <div className="main">
      <h2 className="quoteTitle">
      Thank you  for joining ///. Start your journey by creating your universe or explore others
      </h2>
      <div className="buttonContainer">
        <Link to="/universe">
          {" "}
          <button>Create universe</button>
        </Link>
        <Link to="/exploreOthers">
          {" "}
          <button>Explore others</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateOrExplore;
