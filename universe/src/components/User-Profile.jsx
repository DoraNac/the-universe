import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUniverseById, getPostsByUserId } from "../services/apis";
import "../styles/User-Profile.css";

const UserProfile = () => {
  const { universeId } = useParams();
  const [universe, setUniverse] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch universe
        const universeData = await getUniverseById(universeId);
        console.log("Fetched Universe:", universeData);
        if (Array.isArray(universeData) && universeData.length > 0) {
          setUniverse(universeData[0]);
        } else {
          setError("No universe data found");
        }

        // Fetch posts
        const postsData = await getPostsByUserId(universeId);
        console.log("Fetched Posts:", postsData);
        setPosts(postsData.posts || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [universeId]);

  const handleExploreOthers = () => {
    navigate("/exploreothers");
  };

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const handleAddPost = () => {
    navigate(`/universe/${universeId}/createpost`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!universe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header1">
        <h1>My Universe</h1>
        <button className="univbutton"  onClick={toggleDetails}>Universe Details</button>
      </div>
      {showDetails && (
        <div className="details">
          <h2>Universe title: {universe.titleUniverse}</h2>
          <h2>Universe description: {universe.descriptionUniverse}</h2>
        </div>
      )}
      <div
        className="universeContainer"
        style={{
          backgroundImage: `url(${universe.backgroundUniverse})`,
        }}
      ></div>
      {posts.length > 0 && (
        <div className="posts">
          <h2>Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <h3>{post.content}</h3>
            </div>
          ))}
        </div>
      )}
      <div className="buttons-container">
        <button onClick={handleAddPost}>+ Add Post +</button>
        <Link to="/exploreOthers">
          <button
            onClick={handleExploreOthers}
            className="explore-others-button">
            Explore Others
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
