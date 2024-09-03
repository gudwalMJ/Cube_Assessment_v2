// src/components/gallery/Gallery.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "react-jss";
import { theme } from "../../theme";
import Gallery from "./Gallery";

// Creating a mock set of pictures to use in tests
const mockPictures = [
  { dataUri: "data:image/png;base64,imagedata1", title: "Picture 1" },
  { dataUri: "data:image/png;base64,imagedata2", title: "Picture 2" },
];

// Grouping tests related to the Gallery component
describe("Gallery Component", () => {
  // Test case: Check if the Gallery component renders without crashing and displays all pictures
  test("renders without crashing and displays all pictures", () => {
    // Render the Gallery component wrapped in ThemeProvider to provide the custom theme context
    render(
      <ThemeProvider theme={theme}>
        <Gallery
          title="Test Title"
          setTitle={() => {}}
          pictures={mockPictures}
        />
      </ThemeProvider>
    );

    // Loop through each mock picture to check if it is displayed correctly
    mockPictures.forEach((picture) => {
      // Find the image element by its alt text (which is the picture's title)
      const imgElement = screen.getByAltText(picture.title);
      expect(imgElement).toBeInTheDocument(); // Check if the image element is present in the document
      expect(imgElement).toHaveAttribute("src", picture.dataUri); // Check if the image has the correct src attribute

      // Find the element displaying the picture's title
      const titleElement = screen.getByText(picture.title);
      expect(titleElement).toBeInTheDocument(); // Check if the title element is present in the document
    });
  });

  // Test case: Check if the input for picture title is rendered correctly
  test("renders input for picture title", () => {
    // Render the Gallery component wrapped in ThemeProvider
    render(
      <ThemeProvider theme={theme}>
        <Gallery
          title="Test Title"
          setTitle={() => {}}
          pictures={mockPictures}
        />
      </ThemeProvider>
    );

    const inputElement = screen.getByDisplayValue("Test Title");
    expect(inputElement).toBeInTheDocument();
  });
});
