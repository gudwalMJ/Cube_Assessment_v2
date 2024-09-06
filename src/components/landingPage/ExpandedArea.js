import React from "react";
// Import CSS
import "./ExpandedArea.css";

// Import Components
import StickerSelector from "../stickerSelector/StickerSelector";
import FilterSelector from "../filterSelector/FilterSelector";
import Gallery from "../gallery/Gallery";
import CameraSection from "./CameraSection";

// Import Stickers
import stickers from "../../assets/stickers";

// ExpandedArea component that handles the layout of stickers, filters, camera, and gallery
const ExpandedArea = ({
  title,
  setTitle,
  pictures,
  setPictures,
  setSticker,
  setFilter,
  handleVideoRef,
  handleCanvasRef,
  handleCapture,
}) => {
  return (
    <div className="expandedArea">
      {/* Top row with Stickers and CameraSection */}
      <div className="topRow">
        {/* Stickers Section */}
        <div className="controlsColumn">
          <StickerSelector stickers={stickers} setSticker={setSticker} />
        </div>

        {/* Camera Section */}
        <div className="cameraColumn">
          <CameraSection
            handleVideoRef={handleVideoRef}
            handleCanvasRef={handleCanvasRef}
            handleCapture={handleCapture}
            className="camera" // Apply camera style to CameraSection
          />
        </div>
      </div>

      {/* Filters centered under Stickers and CameraSection */}
      <div className="filterRow">
        <FilterSelector setFilter={setFilter} />
      </div>

      {/* Gallery Section */}
      <Gallery
        title={title}
        setTitle={setTitle}
        pictures={pictures}
        setPictures={setPictures}
      />
    </div>
  );
};

export default ExpandedArea;
