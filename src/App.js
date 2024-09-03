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

// Import stickers from the sticker folder
import stickers from "./assets/stickers";

const useStyles = createUseStyles({
  App: {
    padding: "20px",
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    maxWidth: "2500px",
    margin: "auto",
  },
});

function App(props) {
  const classes = useStyles(props);
  const [sticker, setSticker] = useState(null); // Initialize with null
  const [title, setTitle] = useState("SLAPPE!");
  const [pictures, setPictures] = useState([]); // Updated state to hold multiple pictures

  const [handleVideoRef, handleCanvasRef, handleCapture, capturedPicture] =
    useWebcamCapture(sticker, title); // Pass sticker directly

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
            {/* Pass the entire pictures array to Gallery, including setPictures */}
            <Gallery
              title={title}
              setTitle={setTitle}
              pictures={pictures}
              setPictures={setPictures}
            />
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
