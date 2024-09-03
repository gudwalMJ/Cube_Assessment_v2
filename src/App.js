import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Switch, Route, Redirect } from "react-router-dom";
import backgroundImage from "./assets/images/background.webp";

// Import Hooks
import { useWebcamCapture } from "./hooks/useWebcamCapture";

// Import Components
import LandingPage from "./components/landingPage/LandingPage";
import Readme from "./components/readme/Readme";

// Import Assets

const useStyles = createUseStyles((theme) => ({
  App: {
    padding: "20px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    maxWidth: "2500px",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function App(props) {
  const classes = useStyles(props);
  const [sticker, setSticker] = useState();
  const [title, setTitle] = useState("SLAPPE!");
  const [pictures, setPictures] = useState([]);
  const [handleVideoRef, handleCanvasRef, handleCapture, capturedPicture] =
    useWebcamCapture(sticker, title);

  React.useEffect(() => {
    if (capturedPicture) {
      setPictures((prevPictures) => [...prevPictures, capturedPicture]);
    }
  }, [capturedPicture]);

  return (
    <div className={classes.App}>
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
          />
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
