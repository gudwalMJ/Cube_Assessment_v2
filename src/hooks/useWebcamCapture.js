import { useCallback, useEffect, useRef, useState } from "react";

export const useWebcamCapture = (stickerSrc, title, filter) => {
  const [videoRef, setVideoRef] = useState(null); // Reference for video element
  const [canvasRef, setCanvasRef] = useState(null); // Reference for canvas element
  const [picture, setPicture] = useState(null); // Holds the captured picture
  const [stickerImg, setStickerImg] = useState(null); // Holds the sticker image
  const [initialized, setInitialized] = useState(false); // State to track whether the webcam has been initialized

  const onVideoRef = useCallback((node) => {
    setVideoRef(node); // Set the videoRef when the video element is mounted
  }, []);

  const onCanvasRef = useCallback((node) => {
    setCanvasRef(node); // Set the canvasRef when the canvas element is mounted
  }, []);

  useEffect(() => {
    if (stickerSrc) {
      const img = new Image();
      img.src = stickerSrc;
      img.onload = () => {
        setStickerImg(img); // Set the loaded sticker image
      };
    }
  }, [stickerSrc, filter]);

  useEffect(() => {
    if (videoRef && canvasRef && !initialized) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 }, // Set video width constraints
            height: { min: 576, ideal: 720, max: 1080 }, // Set video height constraints
          },
          audio: false, // Do not request audio
        })
        .then(function (stream) {
          videoRef.srcObject = stream; // Assign the video stream to the video element
          videoRef.play(); // Start playing the video stream
        })
        .catch(function (err) {
          console.log("Couldn't start webcam: " + err); // Log any errors
        });

      const onCanPlay = function () {
        const width = videoRef.videoWidth;
        const height = videoRef.videoHeight / (videoRef.videoWidth / width);

        videoRef.setAttribute("width", width);
        videoRef.setAttribute("height", height);
        canvasRef.setAttribute("width", width);
        canvasRef.setAttribute("height", height);
        videoRef.removeEventListener("canplay", onCanPlay); // Remove the event listener after setting dimensions
      };

      videoRef.addEventListener("canplay", onCanPlay); // Add event listener to adjust dimensions once video can play
      setInitialized(true); // Mark as initialized
    } else if (!videoRef || !canvasRef) {
      setInitialized(false); // Reset initialization state if refs are not set
    }
  }, [videoRef, canvasRef, initialized, filter]);

  const mousePos = useRef({ x: 0, y: 0 });

  const startRenderLoop = useCallback(() => {
    if (canvasRef && videoRef) {
      const renderFrame = () => {
        const ctx = canvasRef.getContext("2d");
        const width = canvasRef.width;
        const height = canvasRef.height;
        ctx.clearRect(0, 0, width, height);
        ctx.filter = filter || "none";
        ctx.drawImage(videoRef, 0, 0, width, height);

        if (stickerImg) {
          const bb = canvasRef.getBoundingClientRect();
          const x = ((mousePos.current.x - bb.left) / bb.width) * width;
          const y = ((mousePos.current.y - bb.top) / bb.height) * height;
          try {
            ctx.drawImage(
              stickerImg,
              x - width * 0.1,
              y - width * 0.1,
              width * 0.2,
              width * 0.2
            );
            console.log("useWebcamCapture: Sticker image drawn on canvas"); // Log sticker drawing
          } catch (error) {
            console.error("Error drawing sticker:", error);
          }
        }

        requestAnimationFrame(renderFrame); // Continue rendering on the next animation frame
      };
      requestAnimationFrame(renderFrame); // Start the rendering loop
    }
  }, [canvasRef, videoRef, stickerImg, filter]);

  useEffect(() => {
    startRenderLoop();
  }, [startRenderLoop, filter]);

  useEffect(() => {
    if (canvasRef) {
      const onMouseMove = (ev) => {
        mousePos.current = { x: ev.clientX, y: ev.clientY }; // Update mouse position
      };
      canvasRef.addEventListener("mousemove", onMouseMove);
      canvasRef.addEventListener("mousedown", onMouseMove);
      return () => {
        canvasRef.removeEventListener("mousemove", onMouseMove);
        canvasRef.removeEventListener("mousedown", onMouseMove);
      };
    }
  }, [canvasRef]);

  const onCapture = useCallback(() => {
    if (canvasRef && videoRef) {
      const ctx = canvasRef.getContext("2d");
      const width = canvasRef.width;
      const height = canvasRef.height;
      ctx.clearRect(0, 0, width, height);
      ctx.filter = filter || "none";
      ctx.drawImage(videoRef, 0, 0, width, height);

      if (stickerImg) {
        const bb = canvasRef.getBoundingClientRect();
        const x = ((mousePos.current.x - bb.left) / bb.width) * width;
        const y = ((mousePos.current.y - bb.top) / bb.height) * height;
        try {
          ctx.drawImage(
            stickerImg,
            x - width * 0.1,
            y - width * 0.1,
            width * 0.2,
            width * 0.2
          );
        } catch (error) {
          console.error("Error drawing sticker during capture:", error);
        }
      }

      const data = canvasRef.toDataURL("image/png");
      setPicture({ dataUri: data, title });
    }
  }, [canvasRef, title, filter, stickerImg, videoRef]);

  return [onVideoRef, onCanvasRef, onCapture, picture];
};
