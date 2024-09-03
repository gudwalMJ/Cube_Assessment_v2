// src/App.js
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useWebcamCapture } from "./hooks/useWebcamCapture";
import { Switch, Route, Redirect } from "react-router-dom";
// Import background image
import backgroundImage from "./assets/images/background.webp";

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
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    maxWidth: "2500px",
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
  const [pictures, setPictures] = useState([]); // Updated state to hold multiple pictures

  const [handleVideoRef, handleCanvasRef, handleCapture, capturedPicture] =
    useWebcamCapture(sticker?.img, title);

  // Effect to add captured picture to the gallery
  React.useEffect(() => {
    if (capturedPicture) {
      setPictures((prevPictures) => [...prevPictures, capturedPicture]);
    }
  }, [capturedPicture]);

  return (
    <div className={classes.App}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <main>
            {/* Pass the entire pictures array to Gallery */}
            <Gallery title={title} setTitle={setTitle} pictures={pictures} />
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
