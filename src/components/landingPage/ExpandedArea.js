// src/components/expandedArea/ExpandedArea.js

import React from "react";
import { createUseStyles } from "react-jss";

// Import Components
import StickerSelector from "../stickerSelector/StickerSelector";
import FilterSelector from "../filterSelector/FilterSelector";
import Gallery from "../gallery/Gallery";
import CameraSection from "./CameraSection"; // Import CameraSection

// Import Stickers
import stickers from "../../assets/stickers";

const useStyles = createUseStyles({
  expandedArea: {
    width: "100%",
    marginTop: "20px",
    display: "flex", // Use flex to allow side-by-side layout
    flexDirection: "column", // Column layout to stack elements vertically
    alignItems: "center",
    padding: "20px",
    gap: "20px", // Add gap between sections
  },
  topRow: {
    display: "flex", // Flex for side-by-side layout
    justifyContent: "center", // Center horizontally
    gap: "20px", // Gap between stickers and camera
    width: "100%",
    alignItems: "flex-start",
  },
  controlsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem", // Space between stickers and filters
    alignItems: "center", // Center items within the column
  },
  cameraColumn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto", // Dynamic width based on camera size
    flexGrow: 1, // Allow the camera to grow
  },
  filterRow: {
    display: "flex", // Flex to center filters
    justifyContent: "center", // Center filters horizontally
    width: "100%",
  },
  camera: {
    width: "100%", // Adjust camera size
    maxWidth: "500px", // Increase the max width for a larger camera view
  },
});

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
  const classes = useStyles();

  return (
    <div className={classes.expandedArea}>
      {/* Top row with Stickers and CameraSection */}
      <div className={classes.topRow}>
        {/* Stickers Section */}
        <div className={classes.controlsColumn}>
          <StickerSelector stickers={stickers} setSticker={setSticker} />
        </div>

        {/* Camera Section */}
        <div className={classes.cameraColumn}>
          <CameraSection
            handleVideoRef={handleVideoRef}
            handleCanvasRef={handleCanvasRef}
            handleCapture={handleCapture}
            className={classes.camera} // Apply camera style to CameraSection
          />
        </div>
      </div>

      {/* Filters centered under Stickers and CameraSection */}
      <div className={classes.filterRow}>
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
