import React, { useState } from "react";
import { createUseStyles } from "react-jss";

// Import Components
import TitleSection from "./TitleSection";
import CameraSection from "./CameraSection";
import ExpandedArea from "./ExpandedArea";

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
}) => {
  const classes = useStyles();
  const [showExpandedArea, setShowExpandedArea] = useState(false);
  const [filter, setFilter] = useState(""); // State for filter

  const handleToggleClick = () => {
    setShowExpandedArea((prev) => !prev);
  };

  return (
    <div className={classes.landingPage}>
      <div className={classes.topSection}>
        <TitleSection
          onToggle={handleToggleClick}
          showExpandedArea={showExpandedArea}
        />
        <CameraSection
          handleVideoRef={handleVideoRef}
          handleCanvasRef={handleCanvasRef}
          handleCapture={handleCapture}
          filter={filter} // Pass the filter to CameraSection
        />
      </div>

      {showExpandedArea && (
        <ExpandedArea
          title={title}
          setTitle={setTitle}
          pictures={pictures}
          setPictures={setPictures}
          setSticker={setSticker}
          setFilter={setFilter} // Pass down setFilter prop
        />
      )}
    </div>
  );
};

export default LandingPage;
