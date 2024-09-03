import React, { useState } from "react";
import { createUseStyles } from "react-jss";

// Import Components
import Lightbox from "./Lightbox";
import Picture from "./Picture";

const useStyles = createUseStyles((theme) => ({
  Gallery: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "50px",
    marginBottom: "50px",
  },
}));

const Gallery = ({ title, setTitle, pictures, setPictures }) => {
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

  const handleDelete = (index) => {
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
  };

  return (
    <section>
      <div>
        Slap it a name
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>
      <div className={classes.Gallery}>
        {pictures.map((picture, index) => (
          <Picture
            key={index}
            picture={picture}
            index={index}
            handleImageClick={handleImageClick}
            handleDelete={handleDelete}
          />
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
