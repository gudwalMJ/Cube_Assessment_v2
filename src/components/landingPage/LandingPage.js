import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Main from "../main/Main";
import Gallery from "../gallery/Gallery";
import StickerSelector from "../stickerSelector/StickerSelector";
import stickers from "../../assets/stickers";

const useStyles = createUseStyles({
  landingPage: {
    display: "flex",
    flexDirection: "column", // Stack elements vertically
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
  leftPanel: {
    flex: "1",
    paddingRight: "20px",
    color: "white", // Set text color to white
    fontFamily: "'Martian Mono', monospace", // Use "Martian Mono" font
    "& h1": {
      fontWeight: "700",
      fontSize: "4rem", // Font for the title
      textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)",
      margin: "0 0 10px 0",
    },
    "& p": {
      fontWeight: "700",
      fontSize: "2rem", // Paragraph font
      textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)",
    },
  },
  rightPanel: {
    flex: "1",
    paddingLeft: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "15px 40px", // Increase padding for a larger button
    fontWeight: "700",
    fontSize: "1.5em", // Font for button
    color: "#fff",
    backgroundColor: "#ff6347",
    border: "none",
    borderRadius: "5px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    cursor: "pointer",
    fontFamily: "'Martian Mono', monospace", // Apply "Martian Mono" font to the button
    "&:hover": {
      backgroundColor: "#ff4500",
    },
  },
  expandedArea: {
    width: "100%",
    marginTop: "20px",
    marginLeft: "2px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#b3d9ff", // Light blue background for the expanded area
    padding: "20px", // Add padding for spacing inside the area
    borderRadius: "10px", // Add rounded corners for a softer look
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add subtle shadow for depth
  },
});

const LandingPage = ({
  onStart,
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

  const handleStartClick = () => {
    setShowExpandedArea(true);
  };

  return (
    <div className={classes.landingPage}>
      <div className={classes.topSection}>
        <div className={classes.leftPanel}>
          <h1>SlapSticker</h1>
          <p>
            Have you ever said something so dumb, you just wanted to slap
            yourself? Well, now you can!
          </p>
          <button className={classes.button} onClick={handleStartClick}>
            Let's Start
          </button>
        </div>
        {/* Camera area is always on the right panel */}
        <div className={classes.rightPanel}>
          <Main
            handleVideoRef={handleVideoRef}
            handleCanvasRef={handleCanvasRef}
            handleCapture={handleCapture}
          />
        </div>
      </div>

      {/* Expanded area below the top section */}
      {showExpandedArea && (
        <div className={classes.expandedArea}>
          <StickerSelector stickers={stickers} setSticker={setSticker} />
          <Gallery
            title={title}
            setTitle={setTitle}
            pictures={pictures}
            setPictures={setPictures}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
