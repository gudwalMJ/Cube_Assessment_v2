import React from "react";
import { createUseStyles } from "react-jss";

// Import Components
import Main from "../main/Main";

const useStyles = createUseStyles({
  rightPanel: {
    flex: "1",
    paddingLeft: "20px",
  },
});

const CameraSection = ({
  handleVideoRef,
  handleCanvasRef,
  handleCapture,
  filter,
}) => {
  // Add filter prop here
  const classes = useStyles();

  return (
    <div className={classes.rightPanel}>
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
