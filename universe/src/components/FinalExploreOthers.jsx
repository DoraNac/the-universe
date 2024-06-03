import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUniverses } from "../services/apis";
import "../styles/FinalExploreOthers.css";

const FinalOthers = () => {
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

  const handleCatClick = () => {
    navigate("/finalpost");
  };

  return (
    <div className="explore-container">
      <div className="profile-header">
        <h1>Explore other universes</h1>
      </div>
      <div className="details">
        <h2>universe title</h2>
        <h2>universe description</h2>
      </div>

      <div className="universeImage">
        <img
          className="background"
          src="https://images.unsplash.com/photo-1560232319-6e3a8aab6a5b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwbmF0dXJlfGVufDB8fDB8fHww"
          alt=""
        />
      </div>
      <div className="postsImages">
      <img
          className="cat"
          src="https://cdn.pixabay.com/photo/2017/09/01/00/15/png-2702691_1280.png"
          alt=""
          onClick={handleCatClick}
          style={{ cursor: "pointer" }}
        />
        <img
          className="bird"
          src="https://cdn.pixabay.com/photo/2012/05/07/05/16/siamese-cat-48018_960_720.png"
          alt=""
        />
        <img src="" alt="" />
        <img
          className="orangecat"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4cc95e3e-4d8a-4bf8-99c8-6166084d56ec/d99ey1q-e8cc1684-ceea-492a-b876-50ffc71201b2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRjYzk1ZTNlLTRkOGEtNGJmOC05OWM4LTYxNjYwODRkNTZlY1wvZDk5ZXkxcS1lOGNjMTY4NC1jZWVhLTQ5MmEtYjg3Ni01MGZmYzcxMjAxYjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Gks3x3Ptj8uJ2DvKsrt2OtuYLz66u4tlU81X29NXzJ4"
          alt=""
        />
        <img
          className="palm"
          src="https://cdn.pixabay.com/photo/2021/09/10/00/07/cat-6611753_960_720.png"
          alt=""
        />
        <img
          className="duck"
          src="https://cdn.pixabay.com/photo/2023/11/24/10/16/duck-8409656_960_720.png"
          alt=""
        />
         <img
          className="heart"
          src="https://www.onlygfx.com/wp-content/uploads/2021/02/6-pixel-heart-4.png"
          alt=""
        />
      </div>

      <div className="details">
        <h2>universe title: </h2>
        <h2>universe description</h2>
      </div>

      <div className="universeImage">
        <img
          className="background"
          src="https://img.freepik.com/free-vector/watercolor-sugar-cotton-clouds-background_52683-80661.jpg"
          alt=""
        />
      </div>
      <div className="postsImages">
        <img
          className="bicycle"
          src="https://cdn.pixabay.com/photo/2017/09/17/02/02/png-2757379_960_720.png"
          alt=""
        />
        <img
          className="sun"
          src="https://cdn.pixabay.com/photo/2022/04/08/19/38/sun-7120188_960_720.png"
          alt=""
        />
        <img src="" alt="" />
        <img
          className="heart2"
          src="https://cdn.pixabay.com/photo/2020/10/16/23/12/heart-5660816_960_720.png"
          alt=""
        />
        <img
          className="rose"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f8b32e70304973.5b9f91acd7d10.png"
          alt=""
        />
        <img
          className="heartsecond"
          src="https://cdn.pixabay.com/photo/2015/09/25/15/27/cathedral-957588_960_720.png"
          alt=""
        />
      </div>

      <div className="details">
        <h2>universe title</h2>
        <h2>universe description</h2>
      </div>

      <div className="universeImage">
        <img
          className="background"
          src="https://www.shutterstock.com/shutterstock/videos/1105023629/thumb/1.jpg?ip=x480"
          alt=""
        />
      </div>
      <div className="postsImages">
        <img
          className="skull"
          src="https://cdn.pixabay.com/photo/2022/10/27/22/56/skull-7551978_960_720.png"
          alt=""
        />
        <img
          className="car"
          src="https://cdn.pixabay.com/photo/2020/03/20/19/21/car-4951734_960_720.png"
          alt=""
        />
      
        <img
          className="question"
          src="https://cdn.pixabay.com/photo/2021/02/03/05/37/question-mark-5976736_960_720.png"
          alt=""
        />
        <img
          className="laptop"
          src="https://cdn.pixabay.com/photo/2014/04/02/10/39/computer-304146_640.png"
          alt=""
        />
        <img
          className="joystick"
          src="https://cdn.pixabay.com/photo/2023/01/02/20/49/controller-7692999_640.png"
          alt=""
        />
           <img
          className="film"
          src="https://cdn.pixabay.com/photo/2016/03/31/18/36/cinema-1294496_1280.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default FinalOthers;
