import React from "react";
// Import CSS
import "./Lightbox.css";

// Lightbox component for displaying images in an overlay with navigation and close options
const Lightbox = ({ src, onClose, onNext, onPrev }) => {
  return (
    <div className="lightboxOverlay" onClick={onClose}>
      {/* Close button */}
      <span className="lightboxCloseButton" onClick={onClose}>
        &times;
      </span>

      {/* Navigation controls (left/right arrows) */}
      <span
        className="lightboxNavigation"
        onClick={(e) => e.stopPropagation()} // Prevent event propagation to avoid closing lightbox on click
      >
        <span onClick={onPrev} style={{ marginLeft: "1rem" }}>
          &#9664; {/* Left arrow */}
        </span>
        <span onClick={onNext} style={{ marginRight: "1rem" }}>
          &#9654; {/* Right arrow */}
        </span>
      </span>

      {/* Image being displayed in the lightbox */}
      <img
        src={src}
        alt="Lightbox"
        className="lightboxImage"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
      />
    </div>
  );
};

export default Lightbox;
