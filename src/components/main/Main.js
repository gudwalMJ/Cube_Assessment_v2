import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  Main: {
    background: theme.palette.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Adjust width to ensure it fills the container
    height: "100%", // Adjust height to ensure it fills the container
    "& canvas": {
      width: "100%", // Make sure the canvas fills its container
      height: "auto",
    },
    "& video": {
      display: "none",
    },
  },
}));

const Main = ({ handleVideoRef, handleCanvasRef, handleCapture }) => {
  const classes = useStyles();
  return (
    <section className={classes.Main}>
      <video ref={handleVideoRef} />
      <canvas
        ref={handleCanvasRef}
        width={2}
        height={2}
        onClick={handleCapture}
      />
    </section>
  );
};

export default Main;
