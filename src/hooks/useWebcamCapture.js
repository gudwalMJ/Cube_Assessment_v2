import { useState } from "react";

// Import all the components
import useVideoAndCanvasRefs from "./useVideoAndCanvasRefs";
import useInitializeWebcam from "./useInitializeWebcam";
import useStickerImage from "./useStickerImage";
import useRenderLoop from "./useRenderLoop";
import useMousePosition from "./useMousePosition";
import useCaptureImage from "./useCaptureImage";

export const useWebcamCapture = (stickerSrc, title, filter) => {
  const [picture, setPicture] = useState(null);
  const { videoRef, canvasRef, onVideoRef, onCanvasRef } =
    useVideoAndCanvasRefs();

  useInitializeWebcam(videoRef, canvasRef);
  const stickerImg = useStickerImage(stickerSrc);
  const mousePos = useMousePosition(canvasRef);

  useRenderLoop(canvasRef, videoRef, stickerImg, filter, mousePos);
  const onCapture = useCaptureImage(
    canvasRef,
    videoRef,
    filter,
    stickerImg,
    title,
    mousePos,
    setPicture
  );

  return [onVideoRef, onCanvasRef, onCapture, picture];
};
