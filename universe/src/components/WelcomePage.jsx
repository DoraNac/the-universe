import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="main">
      <h1 className="appTitle">Welcome to ///</h1>
      <h2 className="quoteTitle">A place to express yourself. Explore other universes and share your own.</h2>
      <div className="buttonContainer">
        <Link to="/register">
          {" "}
          <button>Start Creating Your Universe</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;