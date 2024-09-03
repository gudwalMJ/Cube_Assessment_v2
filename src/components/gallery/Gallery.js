import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  Gallery: {
    "& img": {
      height: "16rem",
    },
  },
  Picture: {
    background: "black",
    padding: 4,
    position: "relative",
    display: "inline-block",
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
    },
  },
}));

const Gallery = ({ title, setTitle, picture }) => {
  const classes = useStyles();
  return (
    <section className={classes.Gallery}>
      Step one: Give it a name
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      Step 4: Cherish this moment forever
      {picture && (
        <div className={classes.Picture}>
          <img src={picture.dataUri} alt="Captured" />
          <h3>{picture.title}</h3>
        </div>
      )}
    </section>
  );
};

export default Gallery;
