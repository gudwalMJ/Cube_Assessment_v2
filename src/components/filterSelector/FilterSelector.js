import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    width: "100%",
  },
  controlRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
    width: "100%",
    justifyContent: "flex-start",
  },
  filtersButton: {
    marginTop: "10px",
    marginRight: "auto",
    padding: "15px 40px",
    fontWeight: "700",
    fontSize: "1.5em",
    color: "#fff",
    backgroundColor: "#ff6347",
    border: "none",
    borderRadius: "5px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    cursor: "default", // Keep as default to indicate it's a label
    fontFamily: "'Martian Mono', monospace",
  },
  Filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    alignItems: "center",
  },
  filterButton: {
    width: "120px", // Set a fixed width for all buttons
    padding: "12px 16px", // Increased padding for larger size
    borderRadius: "5px",
    border: "none",
    background: "#e6f7ff",
    cursor: "pointer",
    fontSize: "1rem", // Increased font size
    fontWeight: "bold", // Optionally make the font bold for better visibility
    fontFamily: "'Martian Mono', monospace",
    textAlign: "center", // Center the text within the button
    transition: "background 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#cfe7f5",
      transform: "scale(1.05)",
    },
    "&.selected": {
      backgroundColor: "#ff6347",
      color: "#fff",
    },
  },
});

const FilterSelector = ({ setFilter }) => {
  const classes = useStyles();
  const [selectedFilter, setSelectedFilter] = useState("");

  const filters = [
    { name: "None", value: "" },
    { name: "Grayscale", value: "grayscale(100%)" },
    { name: "Sepia", value: "sepia(100%)" },
    { name: "Blur", value: "blur(5px)" },
    // Add more filters as needed
  ];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter.value);
    setFilter(filter.value);
  };

  return (
    <div className={classes.filterContainer}>
      <div className={classes.controlRow}>
        <button className={classes.filtersButton}>Filters</button>
      </div>

      {/* Filters Section Always Visible */}
      <div className={classes.Filters}>
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`${classes.filterButton} ${
              selectedFilter === filter.value ? "selected" : ""
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
