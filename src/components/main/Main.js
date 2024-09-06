import React from "react";
// Import CSS
import "./Main.css";

// Main component handles rendering the video and canvas elements
const Main = ({ handleVideoRef, handleCanvasRef, handleCapture, filter }) => {
  return (
    <section className="Main">
      {/* Video element with applied filter */}
      <video ref={handleVideoRef} style={{ filter }} />

      {/* Canvas element that will capture images on click, with applied filter */}
      <canvas
        ref={handleCanvasRef}
        width={2}
        height={2}
        onClick={handleCapture}
        style={{ filter }}
      />
    </section>
  );
};

export default Main;
