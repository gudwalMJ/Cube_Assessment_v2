import React from "react";
// Import CSS
import "./Picture.css";

// Import the delete and download icons
import deleteIcon from "../../assets/icons/delete.png";
import downloadIcon from "../../assets/icons/download.png";

// Picture component for displaying individual images with download and delete options
const Picture = ({ picture, index, handleImageClick, handleDelete }) => {
  // Function to handle delete action with confirmation
  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this SLAP?"
    );
    if (isConfirmed) {
      handleDelete(index); // Call the handleDelete function if the user confirms
    }
  };

  return (
    <div className="Picture">
      {/* Image that opens lightbox on click */}
      <img
        src={picture.dataUri}
        alt={picture.title}
        onClick={() => handleImageClick(index)} // Open lightbox when the image is clicked
      />
      <h3>{picture.title}</h3> {/* Picture title */}
      {/* Download button to save the image */}
      <a
        href={picture.dataUri}
        download={picture.title || "download"} // Download image with title or default name
        className="downloadButton"
      >
        <img src={downloadIcon} alt="Download" />
      </a>
      {/* Delete button to remove the image with confirmation */}
      <div className="deleteButton" onClick={handleDeleteClick}>
        <img src={deleteIcon} alt="Delete" />
      </div>
    </div>
  );
};

export default Picture;
