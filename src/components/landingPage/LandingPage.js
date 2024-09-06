import React, { useState } from "react";
// Import CSS
import "./LandingPage.css";

// Import Components
import TitleSection from "./TitleSection";
import ExpandedArea from "./ExpandedArea";

// LandingPage component that handles layout and interaction logic for the main page
const LandingPage = ({
  handleVideoRef,
  handleCanvasRef,
  handleCapture,
  title,
  setTitle,
  pictures,
  setPictures,
  setSticker,
  setFilter,
}) => {
  const [showExpandedArea, setShowExpandedArea] = useState(false); // Track whether the expanded area is shown

  // Toggle the visibility of the expanded area
  const handleToggleClick = () => {
    setShowExpandedArea((prev) => !prev);
  };

  // Handle the filter change by setting the new filter
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="landingPage">
      <div className="topSection">
        <TitleSection
          onToggle={handleToggleClick}
          showExpandedArea={showExpandedArea}
        />
      </div>

      {/* Show the ExpandedArea component only if showExpandedArea is true */}
      {showExpandedArea && (
        <ExpandedArea
          title={title}
          setTitle={setTitle}
          pictures={pictures}
          setPictures={setPictures}
          setSticker={setSticker}
          setFilter={handleFilterChange}
          handleVideoRef={handleVideoRef} // Pass props down to ExpandedArea
          handleCanvasRef={handleCanvasRef}
          handleCapture={handleCapture}
        />
      )}
    </div>
  );
};

export default LandingPage;
