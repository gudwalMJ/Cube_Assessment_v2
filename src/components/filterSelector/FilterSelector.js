import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  filterContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the entire container
    position: "relative",
    width: "100%",
  },
  filterRow: {
    display: "flex",
    alignItems: "center", // Center vertically within the row
    gap: "1rem",
    justifyContent: "center", // Center horizontally within the row
    marginBottom: "1rem",
    width: "100%",
  },
  filtersButton: {
    padding: "12px 20px", // Adjust padding for a more balanced look
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
    gap: "1rem",
    alignItems: "center",
  },
  filterButton: {
    width: "120px",
    padding: "12px 16px",
    borderRadius: "5px",
    border: "none",
    background: "#e6f7ff",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily: "'Martian Mono', monospace",
    textAlign: "center",
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
      {/* Filters Row with Label and Buttons */}
      <div className={classes.filterRow}>
        <button className={classes.filtersButton}>Filters</button>

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
    </div>
  );
};

export default FilterSelector;
