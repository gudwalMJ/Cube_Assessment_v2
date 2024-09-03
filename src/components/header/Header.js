import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  Header: {
    "& h1": {
      fontFamily: "sans-serif",
      cursor: "pointer",
      fontSize: "4rem",
    },
    "& a": {
      color: theme.palette.text,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.Header}>
      <h1>SlapSticker</h1>
      <p>
        Have you ever said something so dumb, you just wanted to slap yourself?
        Well, now you can!
      </p>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/readme">Readme</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
