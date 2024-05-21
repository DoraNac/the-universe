import React from "react";
import { Link } from "react-router-dom";

const SuccessfulUniverse = () => {
  return (
    <div className="main">
      <h1> title</h1>
      <h1>description</h1>
      <h2 className="quoteTitle">
      Your universe is empty. Create your first post or explore and lose yourself in other universes.
      </h2>
      <div className="buttonContainer">
        <Link to="/createPost">
          {" "}
          <button>Create a post</button>
        </Link>
        <Link to="/exploreOthers">
          {" "}
          <button>Explore others</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulUniverse;
