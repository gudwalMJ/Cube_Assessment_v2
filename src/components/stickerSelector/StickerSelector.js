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
    gap: "1rem",
    marginBottom: "1rem",
    width: "100%",
    justifyContent: "flex-start", // Aligns content to the left
  },
  stickersButton: {
    marginTop: "10px", // Aligns closely to the expanded area
    marginRight: "auto", // Pushes the button to the left
    padding: "15px 40px", // Matches the "Or Not" button size
    fontWeight: "700",
    fontSize: "1.5em",
    color: "#fff",
    backgroundColor: "#ff6347", // Same color as "Or Not" button
    border: "none",
    borderRadius: "5px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    cursor: "pointer",
    fontFamily: "'Martian Mono', monospace", // Font family
    "&:hover": {
      backgroundColor: "#ff4500", // Hover color
    },
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
    marginTop: "20px",
    backgroundColor: "#e6f7ff",
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
