import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  Main: {
    background: theme.palette.secondary,
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
      Step three: Slap yourself!
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
