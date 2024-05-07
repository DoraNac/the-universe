import React from "react";
import { Link } from "react-router-dom";

const CreateOrExplore = () => {
  return (
    <div className="main">
      <h2 className="quoteTitle">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
      <div className="buttonContainer">
        <Link to="/createUniverse">
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
