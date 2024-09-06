import { useEffect, useState } from "react";

// Custom hook to initialize the webcam and set up video and canvas dimensions
const useInitializeWebcam = (videoRef, canvasRef) => {
  // State to track whether the webcam has been initialized
  const [initialized, setInitialized] = useState(false);

  // Effect to initialize the webcam and adjust the video/canvas dimensions
  useEffect(() => {
    // Only proceed if both videoRef and canvasRef are available and not yet initialized
    if (videoRef && canvasRef && !initialized) {
      // Request access to the user's webcam
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 }, // Set the video width constraints
            height: { min: 576, ideal: 720, max: 1080 }, // Set the video height constraints
          },
          audio: false, // Disable audio capture
        })
        .then((stream) => {
          // Assign the video stream to the video element
          videoRef.srcObject = stream;
          videoRef.play(); // Start playing the video stream
        })
        .catch((err) => {
          // Log any errors that occur while accessing the webcam
          console.log("Couldn't start webcam: " + err);
        });

      // Once the video can play, set the video and canvas dimensions
      const onCanPlay = () => {
        const width = videoRef.videoWidth; // Get the actual video width
        const height = videoRef.videoHeight / (videoRef.videoWidth / width); // Calculate the aspect ratio

        // Set the video and canvas dimensions based on the video stream
        videoRef.setAttribute("width", width);
        videoRef.setAttribute("height", height);
        canvasRef.setAttribute("width", width);
        canvasRef.setAttribute("height", height);

        // Remove the event listener after setting dimensions
        videoRef.removeEventListener("canplay", onCanPlay);
      };

      // Add an event listener to adjust dimensions when the video is ready to play
      videoRef.addEventListener("canplay", onCanPlay);

      // Mark the webcam as initialized
      setInitialized(true);
    } else if (!videoRef || !canvasRef) {
      // Reset initialization state if videoRef or canvasRef are not available
      setInitialized(false);
    }
  }, [videoRef, canvasRef, initialized]); // Dependencies ensure this effect runs when refs or initialization state changes

  // Return the initialized state, which can be used by other components
  return initialized;
};

export default useInitializeWebcam;
