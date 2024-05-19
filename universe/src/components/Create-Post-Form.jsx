import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import axios from "axios";
import "../styles/Create-Post-Form.css";

const PostForm = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [mode, setMode] = useState("brush");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const GIPHY_API_KEY = "Q8DTeBEDyIR4p56N9i5Eb6bPJ7M3LUwR";

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
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

  const handleSavePost = () => {
    const dataUrl = canvas.toDataURL();
    const post = {
      title,
      description,
      links,
      canvas: dataUrl,
      sticker: searchTerm,
    };
  
    console.log("Post Data:", JSON.stringify(post));
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

  const handleDeleteObject = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  const searchGifs = async () => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/stickers/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=5`
      );
      setSearchResults(response.data.data);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error searching stickers:", error);
    }
  };

  const handleGifSelect = (gif) => {
    const gifId = gif.id;
    const newStickerUrl = `https://i.giphy.com/${gifId}.webp`;
    setSearchTerm(newStickerUrl);
    setShowSearchResults(false);

    // console.log("Selected Sticker URL:", newStickerUrl);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="mainPostForm">
      <div className="input">
        <div className="title">
          <h1>Create your post</h1>
        </div>
        <p className="p">Post title</p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="p">Post description</p>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="modes">
        <button
          className={mode === "brush" ? "active" : ""}
          onClick={handleBrushMode}
        >
          Brush
        </button>
        <button
          className={mode === "text" ? "active" : ""}
          onClick={handleTextMode}
        >
          Text
        </button>
        <button
          className={mode === "image" ? "active" : ""}
          onClick={handleImageMode}
        >
          Image
        </button>
        <button className="deleteButton" onClick={handleDeleteObject}>
          Delete
        </button>
      </div>
      <div className="input">
        {mode === "image" ? (
          <input type="file" onChange={handleImageUpload} />
        ) : null}
      </div>

      <div className="canvas">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="input">
        <p className="p">Links to share</p>
        <input
          type="text"
          placeholder="Links"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
        />
      </div>
      <div className="input">
        <p className="p">Select a sticker for your post</p>
        <input
          type="text"
          placeholder="Search by keywords.."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={searchGifs}>Search</button>
      </div>
      {showSearchResults && (
        <div className="gifResults">
          {searchResults.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={() => handleGifSelect(gif)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      )}
      <div className="save">
        <button onClick={handleSavePost}>Save Post</button>
      </div>
    </div>
  );
};

export default PostForm;
