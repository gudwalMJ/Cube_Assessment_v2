import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  Stickers: {
    "& img": {
      height: "4rem",
    },
  },
}));

const StickerSelector = ({ stickers, setSticker }) => {
  const classes = useStyles();
  return (
    <section className={classes.Stickers}>
      Step 2: Select your sticker...
      {stickers.map((sticker, index) => (
        <button key={index} onClick={() => setSticker(sticker)}>
          <img src={sticker.url} alt={`Sticker ${index}`} />
        </button>
      ))}
    </section>
  );
};

export default StickerSelector;
