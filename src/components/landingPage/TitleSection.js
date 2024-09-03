import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  leftPanel: {
    flex: "1",
    paddingRight: "20px",
    color: "white",
    fontFamily: "'Martian Mono', monospace",
    "& h1": {
      fontWeight: "700",
      fontSize: "4rem",
      textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)",
      margin: "0 0 10px 0",
    },
    "& p": {
      fontWeight: "700",
      fontSize: "2rem",
      textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)",
    },
  },
  button: {
    marginTop: "20px",
    padding: "15px 40px",
    fontWeight: "700",
    fontSize: "1.5em",
    color: "#fff",
    backgroundColor: "#ff6347",
    border: "none",
    borderRadius: "5px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    cursor: "pointer",
    fontFamily: "'Martian Mono', monospace",
    "&:hover": {
      backgroundColor: "#ff4500",
    },
  },
});

const TitleSection = ({ onToggle, showExpandedArea }) => {
  const classes = useStyles();

  return (
    <div className={classes.leftPanel}>
      <h1>SlapSticker</h1>
      <p>
        Have you ever said something so dumb, you just wanted to slap yourself?
        Well, now you can!
      </p>
      <button className={classes.button} onClick={onToggle}>
        {showExpandedArea ? "Or Not" : "Let's Start"}
      </button>
    </div>
  );
};

export default TitleSection;
