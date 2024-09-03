import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  lightboxOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  lightboxImage: {
    maxWidth: "90%",
    maxHeight: "90%",
  },
  lightboxCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    color: "white",
    fontSize: 24,
    cursor: "pointer",
  },
  lightboxNavigation: {
    position: "absolute",
    top: "50%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    fontSize: 24,
    cursor: "pointer",
  },
});

const Lightbox = ({ src, onClose, onNext, onPrev }) => {
  const classes = useStyles();

  return (
    <div className={classes.lightboxOverlay} onClick={onClose}>
      <span className={classes.lightboxCloseButton} onClick={onClose}>
        &times;
      </span>
      <span
        className={classes.lightboxNavigation}
        onClick={(e) => e.stopPropagation()}
      >
        <span onClick={onPrev} style={{ marginLeft: "1rem" }}>
          &#9664;
        </span>
        <span onClick={onNext} style={{ marginRight: "1rem" }}>
          &#9654;
        </span>
      </span>
      <img
        src={src}
        alt="Lightbox"
        className={classes.lightboxImage}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Lightbox;
