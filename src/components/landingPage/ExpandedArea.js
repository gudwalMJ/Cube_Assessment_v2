import React from "react";
import { createUseStyles } from "react-jss";

// Import Components
import StickerSelector from "../stickerSelector/StickerSelector";
import FilterSelector from "../filterSelector/FilterSelector";
import Gallery from "../gallery/Gallery";

// Import Stickers
import stickers from "../../assets/stickers";

const useStyles = createUseStyles({
  expandedArea: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  controlsRow: {
    display: "flex",
    flexDirection: "column", // Change to column to stack buttons
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "20px",
    gap: "1rem", // Add space between stickers and filters
  },
});

const ExpandedArea = ({
  title,
  setTitle,
  pictures,
  setPictures,
  setSticker,
  setFilter,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.expandedArea}>
      {/* Controls for Stickers and Filters */}
      <div className={classes.controlsRow}>
        <StickerSelector stickers={stickers} setSticker={setSticker} />
        <FilterSelector setFilter={setFilter} />
      </div>

      {/* Gallery Section */}
      <Gallery
        title={title}
        setTitle={setTitle}
        pictures={pictures}
        setPictures={setPictures}
      />
    </div>
  );
};

export default ExpandedArea;
