import { useCallback } from "react";

// Custom hook for capturing an image from the video feed with filters and stickers applied
const useCaptureImage = (
  canvasRef, // Reference to the canvas element
  videoRef, // Reference to the video element
  filter, // The selected filter (e.g., grayscale, sepia, etc.)
  stickerImg, // The selected sticker image to be applied on the captured image
  title, // The title for the captured image
  mousePos, // The current mouse position (used to position the sticker)
  setPicture // Function to set the captured picture
) => {
  // Function to capture the current frame from the video and draw it on the canvas
  const onCapture = useCallback(() => {
    if (canvasRef && videoRef) {
      const ctx = canvasRef.getContext("2d"); // Get the 2D drawing context of the canvas
      const width = canvasRef.width; // Canvas width
      const height = canvasRef.height; // Canvas height

      // Clear the canvas before drawing
      ctx.clearRect(0, 0, width, height);

      // Apply the selected filter (if any)
      ctx.filter = filter || "none";

      // Draw the current frame from the video onto the canvas
      ctx.drawImage(videoRef, 0, 0, width, height);

      // If a sticker is selected, draw it on the canvas at the current mouse position
      if (stickerImg) {
        const bb = canvasRef.getBoundingClientRect(); // Get canvas bounding box
        const x = ((mousePos.current.x - bb.left) / bb.width) * width; // Calculate the x-coordinate for the sticker
        const y = ((mousePos.current.y - bb.top) / bb.height) * height; // Calculate the y-coordinate for the sticker

        // Draw the sticker at the calculated position on the canvas
        ctx.drawImage(
          stickerImg,
          x - width * 0.1, // Adjust position to center the sticker horizontally
          y - width * 0.1, // Adjust position to center the sticker vertically
          width * 0.2, // Sticker width as 20% of canvas width
          width * 0.2 // Sticker height as 20% of canvas width
        );
      }

      // Convert the canvas content to a PNG data URL
      const data = canvasRef.toDataURL("image/png");

      // Set the captured picture with the image data and title
      setPicture({ dataUri: data, title });
    }
  }, [canvasRef, videoRef, filter, stickerImg, title, mousePos, setPicture]);

  return onCapture; // Return the capture function
};

export default useCaptureImage;
