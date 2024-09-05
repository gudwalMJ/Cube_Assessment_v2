// src/components/landingPage/LandingPage.js

import React, { useState } from "react";
import { createUseStyles } from "react-jss";

// Import Components
import TitleSection from "./TitleSection";
import ExpandedArea from "./ExpandedArea"; // Update import path if needed

const useStyles = createUseStyles({
  landingPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    padding: "40px",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
  },
});

const LandingPage = ({
  handleVideoRef,
  handleCanvasRef,
  handleCapture,
  title,
  setTitle,
  pictures,
  setPictures,
  setSticker,
  setFilter,
}) => {
  const classes = useStyles();
  const [showExpandedArea, setShowExpandedArea] = useState(false);

  const handleToggleClick = () => {
    setShowExpandedArea((prev) => !prev);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter); // Use the filter setter from the parent component
  };

  return (
    <div className={classes.landingPage}>
      <div className={classes.topSection}>
        <TitleSection
          onToggle={handleToggleClick}
          showExpandedArea={showExpandedArea}
        />
      </div>

      {showExpandedArea && (
        <ExpandedArea
          title={title}
          setTitle={setTitle}
          pictures={pictures}
          setPictures={setPictures}
          setSticker={setSticker}
          setFilter={handleFilterChange}
          handleVideoRef={handleVideoRef} // Pass props down to ExpandedArea
          handleCanvasRef={handleCanvasRef}
          handleCapture={handleCapture}
        />
      )}
    </div>
  );
};

export default LandingPage;
