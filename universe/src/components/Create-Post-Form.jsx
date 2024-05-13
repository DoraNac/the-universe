import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import "../styles/Create-Post-Form.css";

const PostForm = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [mode, setMode] = useState("brush");

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

    // Send dataUrl to backend to save as post content
  };

  const handleBrushMode = () => {
    setMode("brush");
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 10;
    canvas.freeDrawingBrush.color = "#000";
    canvas.selection = true; // Enable selection for brush mode
  };

  const handleTextMode = () => {
    setMode("text");
    canvas.isDrawingMode = false;
    canvas.selection = false; // Disable selection for text mode
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

  const handleDeleteObject = (object) => {
    canvas.remove(object);
  };

  return (
    <div className="mainPostForm">
    
      <div className="input">
      <div className="title"><h1>Create your post</h1></div>
      <p className="p">Post title</p>
        <input type="text" placeholder="Title" />
        <p className="p">Post description</p>
        <input type="text" placeholder="Description" />
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

        {canvas &&
          canvas.getActiveObject() &&
    
          mode !== "image" && (
            <button
              className="deleteButton"
              onClick={() => handleDeleteObject(canvas.getActiveObject())}
            >
              Delete
            </button>
          )}
      </div>
      <div className="input">
        {mode === "image" ? (
          <input type="file" onChange={handleImageUpload} />
        ) : null}
      </div>

      <div className="canvas">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="save">
        {" "}
        <button onClick={handleSavePost}>Save Post</button>
      </div>
    </div>
  );
};

export default PostForm;
