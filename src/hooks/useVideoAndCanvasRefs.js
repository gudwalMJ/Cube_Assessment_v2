import { useCallback, useState } from "react";

const useVideoAndCanvasRefs = () => {
  const [videoRef, setVideoRef] = useState(null);
  const [canvasRef, setCanvasRef] = useState(null);

  const onVideoRef = useCallback((node) => {
    setVideoRef(node); // Set the videoRef when the video element is mounted
  }, []);

  const onCanvasRef = useCallback((node) => {
    setCanvasRef(node); // Set the canvasRef when the canvas element is mounted
  }, []);

  return { videoRef, canvasRef, onVideoRef, onCanvasRef };
};

export default useVideoAndCanvasRefs;
