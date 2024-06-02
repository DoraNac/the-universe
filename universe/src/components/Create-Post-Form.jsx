import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Create-Post-Form.css";
import { createPost } from "../services/apis";

const PostForm = () => {
  const { universeId } = useParams();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [mode, setMode] = useState("brush");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [selectedGifUrl, setSelectedGifUrl] = useState("");
  const navigate = useNavigate();
  const GIPHY_API_KEY = "Q8DTeBEDyIR4p56N9i5Eb6bPJ7M3LUwR";

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 400,
      backgroundColor: "#fff",
    });

    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (event) => {
      if (event.code === "Delete") {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);

  const base64ToBlob = (base64, type = "image/png") => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const handleSavePost = async () => {
    const dataUrl = canvas.toDataURL("image/png");
    const canvaBlob = base64ToBlob(dataUrl);
    const imageBlob = await fetch(selectedGifUrl).then((r) => r.blob());

    const formData = new FormData();
    // formData.append("universeId", universeId);
    formData.append("title", title);
    formData.append("content", description);
    formData.append("link", links);
    formData.append("canvaUrl", canvaBlob, "canvas.png");
    formData.append("imageUrl", imageBlob, "image.gif");

    // Log form data before sending it to the backend
    for (const [key, value] of formData.entries()) {
   
    }

    try {
      const response = await createPost(formData);

      if (response.message === "Posted !") {
        navigate(`/universe/${universeId}`);
      } else {
        throw new Error("Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleBrushMode = () => {
    setMode("brush");
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 6;
    canvas.freeDrawingBrush.color = "#000";
    canvas.selection = true;
  };

  const handleTextMode = () => {
    setMode("text");
    canvas.isDrawingMode = false;
    canvas.selection = false;
    const text = new fabric.IText("Type here", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "#000",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing();
  };

  const handleImageMode = () => {
    setMode("image");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const fabricImg = new fabric.Image(img);
          canvas.add(fabricImg);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchGifs = async () => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
          searchTerm
        )}&limit=10`
      );

      setSearchResults(response.data.data);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error searching gifs:", error);
    }
  };

  const handleGifSelect = (gif) => {
    const selectedUrl = gif.images.fixed_height.url;
    setSelectedGifUrl(selectedUrl);
    setSearchTerm(selectedUrl);
    setShowSearchResults(false);
  };

  return (
    <div className="mainPostForm">
      <h1>Create Post</h1>
      <div className="input">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Post description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Share a link"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
        />
      </div>
      <div className="modes">
        <button onClick={handleBrushMode}>Brush</button>
        <button onClick={handleTextMode}>Text</button>
        <button onClick={handleImageMode}>Image</button>
        <input
          type="file"
          onChange={handleImageUpload}
          style={{ display: mode === "image" ? "block" : "none" }}
        />
      </div>
      <div className="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="search-gif input">
        <input
          type="text"
          placeholder="Search for stickers"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={searchGifs}>Search</button>
      </div>
      {showSearchResults && (
        <div className="search-results">
          {searchResults.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={() => handleGifSelect(gif)}
            />
          ))}
        </div>
      )}
      <button className="saveButton" onClick={handleSavePost}>
        Save Post
      </button>
    </div>
  );
};

export default PostForm;
