import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUniverseById } from "../services/apis";

const UserProfile = () => {
  const [universe, setUniverse] = useState(null);
  const [error, setError] = useState(null);
  const { universeId } = useParams(); // Extract universeId from URL

  useEffect(() => {
    const fetchUniverse = async () => {
      try {
        const data = await getUniverseById(universeId); // Pass universeId to API request
        setUniverse(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUniverse();
  }, [universeId]); // Re-fetch data when universeId changes

  // Handle loading and error states
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!universe) {
    return <p>Loading...</p>;
  }

  // Render the profile information
  return (
    <div className="userUniverse">
      <h2 className="universeTitle">{universe.titleUniverse}</h2>
      <h3>{universe.descriptionUniverse}</h3>
      <div className="buttonContainer">
        {/* Add links or buttons for further actions */}
      </div>
    </div>
  );
};

export default UserProfile;
