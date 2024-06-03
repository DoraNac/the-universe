import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUniverses } from "../services/apis";
import "../styles/FinalExplorePost.css";

const FinalPost = () => {
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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="explore-container">
      
       
    
  
      <div className="detailpost">
        <h2>Post title:  PNG </h2>
        <h2>Post description: where are these pngs from?</h2>
      </div>

      <div className="postmain">
        <img
          className="postimage"
          src=""
          alt=""
        />
        <p>wondering where i found all these pngs?? 
        </p> 
        <p>I found them on pixabay!! <br /> 
        <p>I will share the link below :p</p>they have so many vectors, photos ,videos etc to use for free, check them out</p>
        <p>also, no account needed wuhuuu!!!</p>

        <img className="postcat" src="https://cdn.pixabay.com/photo/2024/03/14/18/06/cat-8633535_960_720.png" alt="" />
      </div>
      <div className="linkpost"><a href="https://pixabay.com/">LINKS:  https://pixabay.com/</a></div>
    

    </div>
  );
};

export default FinalPost;
