import React from "react";
// Import CSS
import "./TitleSection.css";

// TitleSection component handles the display of the heading, description, and button
const TitleSection = ({ onToggle, showExpandedArea }) => {
  return (
    <div className="leftPanel">
      {/* Heading */}
      <h1>SlapSticker</h1>

      {/* Description paragraph */}
      <p>
        Have you ever said something so dumb, you just wanted to slap yourself?
        Well, now you can!
      </p>

      {/* Toggle button */}
      <button className="button" onClick={onToggle}>
        {showExpandedArea ? "Or Not" : "Let's Start"}
      </button>
    </div>
  );
};

export default TitleSection;
