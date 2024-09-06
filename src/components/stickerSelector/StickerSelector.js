import React, { useState } from "react";
// Import CSS
import "./StickerSelector.css";

// The StickerSelector component allows users to select a sticker from a list of stickers
const StickerSelector = ({ stickers, setSticker }) => {
  // State to track which sticker is currently selected
  const [selectedSticker, setSelectedSticker] = useState(null);

  // Handle the logic when a sticker is clicked
  const handleStickerClick = (stickerUrl) => {
    // If the clicked sticker is already selected, deselect it
    if (selectedSticker === stickerUrl) {
      setSelectedSticker(null); // Deselect the sticker in the component's state
      setSticker(null); // Deselect the sticker in the parent component's state
    } else {
      // Otherwise, select the clicked sticker
      setSelectedSticker(stickerUrl); // Update the selected sticker in the component's state
      setSticker(stickerUrl); // Pass the selected sticker back to the parent component
    }
  };

  return (
    <div className="stickerContainer">
      {/* Section for the title/button for stickers */}
      <div className="controlRow">
        <button className="stickersButton">Stickers</button>
      </div>

      {/* Display the stickers in a grid layout */}
      <section className="Stickers">
        {/* Map through the stickers */}
        {stickers.map((stickerUrl, index) => (
          <button
            key={index} // Unique key for each sticker
            onClick={() => handleStickerClick(stickerUrl)}
            aria-label={`Sticker ${index}`}
          >
            {/* Wrapper div for the sticker image */}
            <div
              className={`stickerWrapper ${
                selectedSticker === stickerUrl ? "selected" : ""
              }`}
            >
              {/* Display the sticker image */}
              <img src={stickerUrl} alt={`Sticker ${index}`} />
            </div>
          </button>
        ))}
      </section>
    </div>
  );
};

export default StickerSelector;
