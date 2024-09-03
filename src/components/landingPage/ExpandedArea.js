import React from "react";
import { createUseStyles } from "react-jss";

// Import Components
import StickerSelector from "../stickerSelector/StickerSelector";
import Gallery from "../gallery/Gallery";

// Import Stickers
import stickers from "../../assets/stickers";

const useStyles = createUseStyles({
  expandedArea: {
    width: "100%",
    marginTop: "20px",
    marginLeft: "2px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
});

const ExpandedArea = ({
  title,
  setTitle,
  pictures,
  setPictures,
  setSticker,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.expandedArea}>
      <StickerSelector stickers={stickers} setSticker={setSticker} />
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
