import React, { useState } from "react";
// Import CSS
import "./FilterSelector.css";

// FilterSelector component for choosing filters
const FilterSelector = ({ setFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Available filters
  const filters = [
    { name: "None", value: "" },
    { name: "Grayscale", value: "grayscale(100%)" },
    { name: "Sepia", value: "sepia(100%)" },
    { name: "Blur", value: "blur(5px)" },
    // Add more filters as needed
  ];

  // Handle filter selection
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter.value);
    setFilter(filter.value); // Pass the selected filter to the parent component
  };

  return (
    <div className="filterContainer">
      {/* Filters Row with Label and Buttons */}
      <div className="filterRow">
        <button className="filtersButton">Filters</button>

        <div className="Filters">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`filterButton ${
                selectedFilter === filter.value ? "selected" : ""
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSelector;
