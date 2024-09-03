import React from "react";
import { createUseStyles } from "react-jss";
// Import the delete icon
import deleteIcon from "../../assets/icons/delete.png";

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
    "& .deleteButton": {
      position: "absolute",
      bottom: 25,
      right: 15,
      cursor: "pointer",
      width: "24px",
      height: "24px",
      border: "2px solid #a1d9d1",
      borderRadius: "4px",
      backgroundColor: "white",
      padding: "4px",
      boxShadow: "0 0 4px rgba(0, 0, 0, 0.6)",
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
      {/* Delete button */}
      <img
        src={deleteIcon}
        alt="Delete"
        className="deleteButton"
        onClick={() => handleDelete(index)}
      />
    </div>
  );
};

export default Picture;
