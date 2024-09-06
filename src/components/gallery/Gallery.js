import React, { useState } from "react";
// Import CSS
import "./Gallery.css";

// Import Components
import Lightbox from "./Lightbox";
import Picture from "./Picture";

// Gallery component that displays the list of pictures and handles lightbox functionality
const Gallery = ({ title, setTitle, pictures, setPictures }) => {
  const [isOpen, setIsOpen] = useState(false); // Track if lightbox is open
  const [photoIndex, setPhotoIndex] = useState(0); // Track current photo index in lightbox

  // Open the lightbox with the clicked image
  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  // Close the lightbox
  const handleCloseLightbox = () => {
    setIsOpen(false);
  };

  // Navigate to the next image in the lightbox
  const handleNext = (e) => {
    e.stopPropagation();
    setPhotoIndex((photoIndex + 1) % pictures.length);
  };

  // Navigate to the previous image in the lightbox
  const handlePrev = (e) => {
    e.stopPropagation();
    setPhotoIndex((photoIndex + pictures.length - 1) % pictures.length);
  };

  // Delete a picture from the gallery
  const handleDelete = (index) => {
    setPictures((prevPictures) => prevPictures.filter((_, i) => i !== index));
  };

  return (
    <section className="wrapper">
      {/* Title input field */}
      <div className="inputContainer">
        Slap it a name
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>

      {/* Inform the user that images will be displayed below */}
      <p className="galleryInfo">
        Below is your gallery.
        <br /> You can view and manage your SLAPS here.
      </p>

      {/* Gallery section displaying pictures in rows of three */}
      <div className="Gallery">
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

      {/* Lightbox to display clicked images */}
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
