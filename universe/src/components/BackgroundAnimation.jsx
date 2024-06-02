import React from 'react';
import '../styles/BackgroundAnimation.css';

const BackgroundAnimation = () => {
  return (
    <>
      <div className="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
    </>
  );
};

export default BackgroundAnimation;
