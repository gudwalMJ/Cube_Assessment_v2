// src/components/stickerSelector/StickerSelector.js
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  Stickers: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
    alignItems: "center",
    "& button": {
      border: "none",
      background: "none",
      cursor: "pointer",
      padding: 0,
      outline: "none",
    },
    "& img": {
      height: "4rem", // Adjust size as needed
      border: "2px solid transparent", // Border for highlighting
      borderRadius: "4px",
      transition: "border-color 0.3s ease",
      "&:hover": {
        borderColor: "#fff", // White border on hover
      },
    },
  },
});

const StickerSelector = ({ stickers, setSticker }) => {
  const classes = useStyles();

  return (
    <section className={classes.Stickers}>
      <div>Step 2: Select your sticker...</div>
      {stickers.map((stickerUrl, index) => (
        <button key={index} onClick={() => setSticker(stickerUrl)}>
          <img src={stickerUrl} alt={`Sticker ${index}`} />
        </button>
      ))}
    </section>
  );
};

export default StickerSelector;
