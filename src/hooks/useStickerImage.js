import { useEffect, useState } from "react";

const useStickerImage = (stickerSrc) => {
  const [stickerImg, setStickerImg] = useState(null);

  useEffect(() => {
    if (stickerSrc) {
      const img = new Image();
      img.src = stickerSrc;
      img.onload = () => {
        setStickerImg(img); // Set the loaded sticker image
      };
    }
  }, [stickerSrc]);

  return stickerImg;
};

export default useStickerImage;
