import { useEffect, useState } from "react";

const useInitializeWebcam = (videoRef, canvasRef) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (videoRef && canvasRef && !initialized) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
          },
          audio: false,
        })
        .then((stream) => {
          videoRef.srcObject = stream; // Assign the video stream to the video element
          videoRef.play(); // Start playing the video stream
        })
        .catch((err) => {
          console.log("Couldn't start webcam: " + err);
        });

      const onCanPlay = () => {
        const width = videoRef.videoWidth;
        const height = videoRef.videoHeight / (videoRef.videoWidth / width);

        videoRef.setAttribute("width", width);
        videoRef.setAttribute("height", height);
        canvasRef.setAttribute("width", width);
        canvasRef.setAttribute("height", height);
        videoRef.removeEventListener("canplay", onCanPlay);
      };

      videoRef.addEventListener("canplay", onCanPlay);
      setInitialized(true);
    } else if (!videoRef || !canvasRef) {
      setInitialized(false);
    }
  }, [videoRef, canvasRef, initialized]);

  return initialized;
};

export default useInitializeWebcam;
