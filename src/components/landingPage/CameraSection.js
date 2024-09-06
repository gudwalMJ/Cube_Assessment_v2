import React from "react";
// Import CSS
import "./CameraSection.css";

// Import Components
import Main from "../main/Main";

// CameraSection component renders the Main component, which includes the video and canvas
const CameraSection = ({
  handleVideoRef,
  handleCanvasRef,
  handleCapture,
  filter,
}) => {
  return (
    <div className="rightPanel">
      <Main
        handleVideoRef={handleVideoRef}
        handleCanvasRef={handleCanvasRef}
        handleCapture={handleCapture}
        filter={filter}
      />
    </div>
  );
};

export default CameraSection;
