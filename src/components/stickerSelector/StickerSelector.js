import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  stickerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    width: "100%",
  },
  controlRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
    width: "100%",
    justifyContent: "flex-start",
  },
  stickersButton: {
    marginTop: "10px",
    marginRight: "auto",
    padding: "15px 40px",
    fontWeight: "700",
    fontSize: "1.5em",
    color: "#fff",
    backgroundColor: "#ff6347",
    border: "none",
    borderRadius: "5px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    cursor: "default",
    fontFamily: "'Martian Mono', monospace",
  },
  Stickers: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    alignItems: "center",
  },
  stickerWrapper: {
    backgroundColor: "transparent",
    padding: "0",
    boxShadow: "none",
    cursor: "pointer", // Change cursor to pointer when hovering over stickers
    "& img": {
      height: "3.5rem",
      border: "2px solid transparent",
      borderRadius: "50%", // Ensures the image itself is rounded
      transition: "transform 0.2s ease, border-color 0.3s ease",
    },
    "&:hover": {
      transform: "scale(1.05)",
      borderColor: "#b7f2e1",
    },
  },
  selected: {
    borderColor: "#b7f2e1 !important",
  },
});

const StickerSelector = ({ stickers, setSticker }) => {
  const classes = useStyles();
  const [selectedSticker, setSelectedSticker] = useState(null);

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
        <button className={classes.stickersButton}>Stickers</button>
      </div>

      {/* Stickers Section Always Visible */}
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
    </div>
  );
};

export default StickerSelector;
