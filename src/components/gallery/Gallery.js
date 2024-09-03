import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Lightbox from "./Lightbox"; // Import the custom Lightbox

const useStyles = createUseStyles((theme) => ({
  Gallery: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "50px",
    marginBottom: "50px",
  },
  Picture: {
    background: "black",
    padding: 4,
    position: "relative",
    display: "inline-block",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)", // Apply scale on hover
    },
    "& img": {
      height: "16rem",
    },
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
      color: theme.palette.text,
    },
  },
}));

const Gallery = ({ title, setTitle, pictures }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsOpen(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setPhotoIndex((photoIndex + 1) % pictures.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setPhotoIndex((photoIndex + pictures.length - 1) % pictures.length);
  };

  return (
    <section>
      <div>
        Step one: Give it a name
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>
      <div className={classes.Gallery}>
        {pictures.map((picture, index) => (
          <div key={index} className={classes.Picture}>
            <img
              src={picture.dataUri}
              alt={picture.title}
              onClick={() => handleImageClick(index)} // Open lightbox on click
            />
            <h3>{picture.title}</h3>
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          src={pictures[photoIndex].dataUri}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
};

export default Gallery;
