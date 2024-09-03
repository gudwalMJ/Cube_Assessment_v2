// src/components/stickerSelector/StickerSelector.js
import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  stickerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Aligns content to the left
    position: "relative",
  },
  controlRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem", // Space between text and button
    marginBottom: "1rem", // Space below the control row
  },
  burgerButton: {
    backgroundColor: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  Stickers: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    alignItems: "center",
    "& button": {
      border: "none",
      background: "none",
      cursor: "pointer",
      padding: 0,
      outline: "none",
      position: "relative",
      "&:focus": {
        outline: "2px solid #b7f2e1",
        borderRadius: "50px",
      },
    },
  },
  stickerWrapper: {
    backgroundColor: "white",
    borderRadius: "50px",
    padding: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, border-color 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      borderColor: "#b7f2e1",
    },
    "& img": {
      height: "3.5rem",
      border: "2px solid transparent",
      borderRadius: "50px",
      transition: "transform 0.2s ease, border-color 0.3s ease",
    },
  },
  selected: {
    borderColor: "#b7f2e1 !important",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
});

const StickerSelector = ({ stickers, setSticker }) => {
  const classes = useStyles();
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleStickerClick = (stickerUrl) => {
    if (selectedSticker === stickerUrl) {
      setSelectedSticker(null);
      setSticker(null);
    } else {
      setSelectedSticker(stickerUrl);
      setSticker(stickerUrl);
    }
  };

  return (
    <div className={classes.stickerContainer}>
      <div className={classes.controlRow}>
        <div>Step 2: Select your sticker...</div>
        <button
          className={classes.burgerButton}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          ☰ {/* This represents a burger icon */}
        </button>
      </div>

      {/* Render the stickers only if the burger menu is open */}
      {isOpen && (
        <section className={classes.Stickers}>
          {stickers.map((stickerUrl, index) => (
            <button
              key={index}
              onClick={() => handleStickerClick(stickerUrl)}
              aria-label={`Sticker ${index}`}
            >
              <div
                className={`${classes.stickerWrapper} ${
                  selectedSticker === stickerUrl ? classes.selected : ""
                }`}
              >
                <img src={stickerUrl} alt={`Sticker ${index}`} />
              </div>
            </button>
          ))}
        </section>
      )}
    </div>
  );
};

export default StickerSelector;
