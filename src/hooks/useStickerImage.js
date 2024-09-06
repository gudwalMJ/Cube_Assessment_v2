import { useEffect, useState } from "react";

// Custom hook to load a sticker image from a given source URL
const useStickerImage = (stickerSrc) => {
  // State to hold the loaded sticker image
  const [stickerImg, setStickerImg] = useState(null);

  // Effect to load the sticker image whenever the sticker source (stickerSrc) changes
  useEffect(() => {
    // Only load the image if a valid sticker source URL is provided
    if (stickerSrc) {
      const img = new Image(); // Create a new Image object
      img.src = stickerSrc; // Set the source of the image to the provided sticker URL

      // Once the image is fully loaded, update the state with the loaded image
      img.onload = () => {
        setStickerImg(img); // Set the loaded sticker image in state
      };
    }
  }, [stickerSrc]); // Re-run the effect whenever the stickerSrc changes

  // Return the loaded sticker image (or null if not yet loaded)
  return stickerImg;
};

export default useStickerImage;
