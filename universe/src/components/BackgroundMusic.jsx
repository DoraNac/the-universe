import React, { useEffect, useRef } from "react";
import backgroundMusic from "../assets/Newer Wave.mp3"; 

const BackgroundMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1; 
      audioRef.current.loop = true;
      audioRef.current.play(); 
    }
  }, []);

  return (
    <audio ref={audioRef} autoPlay>
      <source src={backgroundMusic} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;
