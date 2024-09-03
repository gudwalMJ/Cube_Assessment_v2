import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  Main: {
    background: theme.palette.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    "& canvas": {
      width: "100%",
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
