import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUniverses } from "../services/apis";
import "../styles/User-Profile.css";
import "../styles/Explore-Others.css";
import "./—Pngtree—goat animal realistic white transparent_9047537.png";


const ExploreOthers = () => {
  const [universes, setUniverses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniverses = async () => {
      try {
        const data = await getAllUniverses();
        setUniverses(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUniverses();
  }, []);

  const handleExploreOthers = () => {
    navigate("/exploreothers");
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
  
    <div className="explore-container">
    
      <h1>Explore other universes</h1>
      <Link to="/final">
          {" "}
          <button>Final</button>
        </Link>
      <div className="universes-list">
        {universes.map((universe) => (
          <div key={universe.id} className="profile">
            <h2>Universe title: {universe.titleUniverse}</h2>
            <p>universe description: {universe.descriptionUniverse}</p>
        
            
            <div
              className="universeContainer"
              style={{ backgroundImage: `url(${universe.backgroundUniverse})` }}
            >
            

             
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreOthers;
