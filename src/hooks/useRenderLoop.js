import { useEffect, useCallback } from "react";

// Custom hook to handle rendering video frames and stickers onto a canvas element in a loop
const useRenderLoop = (canvasRef, videoRef, stickerImg, filter, mousePos) => {
  // Function to start the render loop, which continuously draws frames to the canvas
  const startRenderLoop = useCallback(() => {
    // Ensure both canvasRef and videoRef are available before starting the loop
    if (canvasRef && videoRef) {
      // Function to render each frame onto the canvas
      const renderFrame = () => {
        const ctx = canvasRef.getContext("2d"); // Get the 2D drawing context of the canvas
        const width = canvasRef.width; // Get the canvas width
        const height = canvasRef.height; // Get the canvas height

        // Clear the entire canvas before drawing the new frame
        ctx.clearRect(0, 0, width, height);

        // Apply the selected filter (e.g., grayscale, sepia, etc.) to the canvas
        ctx.filter = filter || "none";

        // Draw the current frame from the video element onto the canvas
        ctx.drawImage(videoRef, 0, 0, width, height);

        // If a sticker image is available, draw it at the current mouse position
        if (stickerImg) {
          const bb = canvasRef.getBoundingClientRect(); // Get the canvas bounding box
          const x = ((mousePos.current.x - bb.left) / bb.width) * width; // Calculate x-coordinate for the sticker
          const y = ((mousePos.current.y - bb.top) / bb.height) * height; // Calculate y-coordinate for the sticker

          // Draw the sticker image at the calculated position on the canvas
          ctx.drawImage(
            stickerImg,
            x - width * 0.1, // Adjust position to center the sticker horizontally
            y - width * 0.1, // Adjust position to center the sticker vertically
            width * 0.2, // Sticker width as 20% of the canvas width
            width * 0.2 // Sticker height as 20% of the canvas width
          );
        }

        // Continue rendering the next frame using requestAnimationFrame for smooth updates
        requestAnimationFrame(renderFrame);
      };

      // Start the rendering loop by calling renderFrame
      requestAnimationFrame(renderFrame);
    }
  }, [canvasRef, videoRef, stickerImg, filter, mousePos]); // Dependencies to recalculate if any of these change

  // Start the render loop whenever the component mounts or dependencies change
  useEffect(() => {
    startRenderLoop(); // Call the render loop
  }, [startRenderLoop, filter]); // Rerun the effect if the render loop function or filter changes
};

export default useRenderLoop;
