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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
  },
  rightPanel: {
    flex: "1",
    paddingLeft: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#ff6347",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ff4500",
    },
  },
  expandedArea: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

      {/* Expanded area should be below the top section */}
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
