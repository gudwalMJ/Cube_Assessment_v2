import { useCallback, useEffect, useRef, useState } from "react";

export const useWebcamCapture = (stickerSrc, title, filter) => {
  // States to hold video and canvas references and other necessary states
  const [videoRef, setVideoRef] = useState(null); // Reference for video element
  const [canvasRef, setCanvasRef] = useState(null); // Reference for canvas element
  const [picture, setPicture] = useState(null); // Holds the captured picture
  const [stickerImg, setStickerImg] = useState(null); // Holds the sticker image

  // State to track whether the webcam has been initialized
  const [initialized, setInitialized] = useState(false);

  // Callbacks for setting refs to video and canvas elements
  const onVideoRef = useCallback((node) => {
    setVideoRef(node); // Set the videoRef when the video element is mounted
  }, []);

  const onCanvasRef = useCallback((node) => {
    setCanvasRef(node); // Set the canvasRef when the canvas element is mounted
  }, []);

  // Effect to load the sticker image whenever stickerSrc changes
  useEffect(() => {
    if (stickerSrc) {
      const img = new Image();
      img.src = stickerSrc;
      img.onload = () => {
        setStickerImg(img); // Set the loaded sticker image
      };
    }
  }, [stickerSrc]);

  // Effect to initialize the webcam and setup video/canvas dimensions
  useEffect(() => {
    if (videoRef && canvasRef && !initialized) {
      // Request access to the webcam
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

      // Once the video can play, set the canvas and video dimensions
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
  }, [videoRef, canvasRef, initialized]);

  // Apply filter to video and canvas elements when the filter changes
  useEffect(() => {
    if (videoRef) {
      videoRef.style.filter = filter || "none"; // Apply filter to video element
    }
    if (canvasRef) {
      canvasRef.style.filter = filter || "none"; // Apply filter to canvas element
    }
  }, [filter, videoRef, canvasRef]);

  // Ref to track mouse position for placing stickers
  const mousePos = useRef({ x: 0, y: 0 });

  // Function to start the rendering loop for drawing video frames and stickers
  const startRenderLoop = useCallback(() => {
    if (canvasRef && videoRef) {
      const renderFrame = () => {
        const ctx = canvasRef.getContext("2d"); // Get the canvas drawing context
        const width = canvasRef.getAttribute("width");
        const height = canvasRef.getAttribute("height");
        ctx.drawImage(videoRef, 0, 0, width, height); // Draw the current video frame onto the canvas

        // If there's a sticker image, draw it onto the canvas based on mouse position
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
            console.error("Error drawing sticker:", error);
          }
        }
        requestAnimationFrame(renderFrame); // Continue rendering on the next animation frame
      };
      requestAnimationFrame(renderFrame); // Start the rendering loop
    }
  }, [canvasRef, videoRef, stickerImg]);

  // Start the rendering loop when the hook is used
  useEffect(() => {
    startRenderLoop();
  }, [startRenderLoop]);

  // Effect to track mouse movements and clicks on the canvas for sticker placement
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

  // Function to capture the current canvas content as an image
  const onCapture = useCallback(() => {
    if (canvasRef) {
      const data = canvasRef.toDataURL("image/png"); // Convert canvas to data URL
      setPicture({ dataUri: data, title }); // Set the captured picture
    }
  }, [canvasRef, title]);

  // Return hooks for use in component
  return [onVideoRef, onCanvasRef, onCapture, picture];
};
