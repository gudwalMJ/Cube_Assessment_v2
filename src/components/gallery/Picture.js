import React from "react";
import { createUseStyles } from "react-jss";
// Import the delete and download icons
import deleteIcon from "../../assets/icons/delete.png";
import downloadIcon from "../../assets/icons/download.png"; // Import the download icon

const useStyles = createUseStyles((theme) => ({
  Picture: {
    background: "black",
    padding: 4,
    position: "relative",
    display: "inline-block",
    transition: "transform 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)", // Apply scale on hover
    },
    "& img": {
      height: "16rem",
      cursor: "pointer",
    },
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
      color: theme.palette.text,
    },
    "& .deleteButton, & .downloadButton": {
      position: "absolute",
      cursor: "pointer",
      width: "24px",
      height: "24px",
      border: "2px solid #a1d9d1",
      borderRadius: "4px",
      backgroundColor: "white",
      padding: "4px",
      boxShadow: "0 0 4px rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .deleteButton": {
      bottom: 25,
      right: 50, // Adjust position for download button
    },
    "& .downloadButton": {
      bottom: 25,
      right: 10, // Position the download button next to the delete button
    },
    "& .deleteButton img, & .downloadButton img": {
      width: "100%",
      height: "100%",
      objectFit: "contain", // Ensures the image fits inside its container
    },
  },
}));

const Picture = ({ picture, index, handleImageClick, handleDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.Picture}>
      <img
        src={picture.dataUri}
        alt={picture.title}
        onClick={() => handleImageClick(index)} // Open lightbox on click
      />
      <h3>{picture.title}</h3>
      {/* Download button */}
      <a
        href={picture.dataUri}
        download={picture.title || "download"} // Use picture title or default to "download"
        className={`${classes.downloadButton} downloadButton`}
      >
        <img src={downloadIcon} alt="Download" />
      </a>
      {/* Delete button */}
      <div
        className={`${classes.deleteButton} deleteButton`}
        onClick={() => handleDelete(index)}
      >
        <img src={deleteIcon} alt="Delete" />
      </div>
    </div>
  );
};

export default Picture;
