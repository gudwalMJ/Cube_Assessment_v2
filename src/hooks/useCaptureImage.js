import { useCallback } from "react";

const useCaptureImage = (
  canvasRef,
  videoRef,
  filter,
  stickerImg,
  title,
  mousePos,
  setPicture
) => {
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
        ctx.drawImage(
          stickerImg,
          x - width * 0.1,
          y - width * 0.1,
          width * 0.2,
          width * 0.2
        );
      }

      const data = canvasRef.toDataURL("image/png");
      setPicture({ dataUri: data, title });
    }
  }, [canvasRef, videoRef, filter, stickerImg, title, mousePos, setPicture]);

  return onCapture;
};

export default useCaptureImage;
