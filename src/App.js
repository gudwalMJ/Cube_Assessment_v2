import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./useWebcamCapture";
import { Switch, Route, Redirect } from "react-router-dom";

// Import components
import Header from "./components/header/Header";
import Gallery from "./components/gallery/Gallery";
import StickerSelector from "./components/stickerSelector/StickerSelector";
import Main from "./components/main/Main";
import Readme from "./components/readme/Readme";

// Import stickers
import logo from "./assets/stickers/slap.png";

const useStyles = createUseStyles((theme) => ({
  App: {
    padding: "20px",
    background: theme.palette.primary,
    maxWidth: "800px",
    minHeight: "600px",
    margin: "auto",
  },
}));

const stickers = [logo].map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

function App(props) {
  const classes = useStyles(props);
  const [sticker, setSticker] = useState();
  const [title, setTitle] = useState("SLAPPE!");
  const [pictures, setPictures] = useState([]); // to hold multiple pictures

  const [handleVideoRef, handleCanvasRef, handleCapture, picture] =
    useWebcamCapture(sticker?.img, title);

  return (
    <div className={classes.App}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <main>
            <Gallery title={title} setTitle={setTitle} picture={picture} />
            <StickerSelector stickers={stickers} setSticker={setSticker} />
            <Main
              handleVideoRef={handleVideoRef}
              handleCanvasRef={handleCanvasRef}
              handleCapture={handleCapture}
            />
          </main>
        </Route>
        <Route path="/readme">
          <Readme />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
