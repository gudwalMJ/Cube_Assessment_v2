import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// Import CSS
import "./App.css";

// Import Hooks
import { useWebcamCapture } from "./hooks/useWebcamCapture";

// Import Components
import LandingPage from "./components/landingPage/LandingPage"; // No Readme import anymore

function App(props) {
  const [sticker, setSticker] = useState();
  const [title, setTitle] = useState("SLAPPE!");
  const [pictures, setPictures] = useState([]);
  const [filter, setFilter] = useState(""); // State for filter
  const [handleVideoRef, handleCanvasRef, handleCapture, capturedPicture] =
    useWebcamCapture(sticker, title, filter); // Pass filter as an argument

  useEffect(() => {
    if (capturedPicture) {
      setPictures((prevPictures) => [...prevPictures, capturedPicture]);
    }
  }, [capturedPicture]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <LandingPage
            handleVideoRef={handleVideoRef}
            handleCanvasRef={handleCanvasRef}
            handleCapture={handleCapture}
            title={title}
            setTitle={setTitle}
            pictures={pictures}
            setPictures={setPictures}
            setSticker={setSticker}
            setFilter={setFilter}
          />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
