import { useState } from "react";

// Import all the custom hooks
import useVideoAndCanvasRefs from "./useVideoAndCanvasRefs"; // Manages video and canvas DOM references
import useInitializeWebcam from "./useInitializeWebcam"; // Handles webcam initialization
import useStickerImage from "./useStickerImage"; // Loads and manages the sticker image
import useRenderLoop from "./useRenderLoop"; // Handles rendering the video and stickers onto the canvas
import useMousePosition from "./useMousePosition"; // Tracks the mouse position for placing the sticker
import useCaptureImage from "./useCaptureImage"; // Captures the current state of the canvas as an image

// Main hook that coordinates the webcam capture functionality
export const useWebcamCapture = (stickerSrc, title, filter) => {
  // State to hold the captured picture
  const [picture, setPicture] = useState(null);

  // Destructure the video and canvas refs and their respective setter functions
  const { videoRef, canvasRef, onVideoRef, onCanvasRef } =
    useVideoAndCanvasRefs();

  // Initialize the webcam and set video/canvas dimensions
  useInitializeWebcam(videoRef, canvasRef);

  // Load the sticker image based on the provided sticker source (stickerSrc)
  const stickerImg = useStickerImage(stickerSrc);

  // Track the current mouse position on the canvas for sticker placement
  const mousePos = useMousePosition(canvasRef);

  // Start the render loop to continuously draw video and stickers onto the canvas
  useRenderLoop(canvasRef, videoRef, stickerImg, filter, mousePos);

  // Define the function to capture the current canvas content as an image
  const onCapture = useCaptureImage(
    canvasRef, // Canvas reference
    videoRef, // Video reference
    filter, // Selected filter
    stickerImg, // Loaded sticker image
    title, // Title for the captured image
    mousePos, // Current mouse position
    setPicture // Function to update the captured picture state
  );

  // Return the refs for video and canvas, capture function, and captured picture
  return [onVideoRef, onCanvasRef, onCapture, picture];
};
