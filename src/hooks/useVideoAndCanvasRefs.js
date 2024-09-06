import { useCallback, useState } from "react";

// Custom hook to manage video and canvas element references
const useVideoAndCanvasRefs = () => {
  // State to hold the reference for the video element
  const [videoRef, setVideoRef] = useState(null);

  // State to hold the reference for the canvas element
  const [canvasRef, setCanvasRef] = useState(null);

  // Callback to set the video element reference when the video element is mounted
  const onVideoRef = useCallback((node) => {
    setVideoRef(node); // Update the videoRef state with the mounted video node
  }, []);

  // Callback to set the canvas element reference when the canvas element is mounted
  const onCanvasRef = useCallback((node) => {
    setCanvasRef(node); // Update the canvasRef state with the mounted canvas node
  }, []);

  // Return both the video and canvas refs along with their corresponding setter functions
  return { videoRef, canvasRef, onVideoRef, onCanvasRef };
};

export default useVideoAndCanvasRefs;
