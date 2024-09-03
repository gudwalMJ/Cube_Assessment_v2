// src/components/effectSelector/EffectSelector.js
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  effectSelector: {
    display: "flex",
    gap: "1rem",
    marginTop: "20px",
  },
  button: {
    padding: "10px 15px",
    cursor: "pointer",
    border: "2px solid #ff6347",
    borderRadius: "5px",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
});

const effects = ["None", "Grayscale", "Sepia", "Invert"];

const EffectSelector = ({ setEffect }) => {
  const classes = useStyles();

  return (
    <div className={classes.effectSelector}>
      {effects.map((effect) => (
        <button
          key={effect}
          className={classes.button}
          onClick={() => setEffect(effect)}
        >
          {effect}
        </button>
      ))}
    </div>
  );
};

export default EffectSelector;
