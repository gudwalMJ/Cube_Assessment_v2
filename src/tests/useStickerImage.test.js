import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useStickerImage from "../hooks/useStickerImage";

// A simple component to test useStickerImage hook
const TestComponent = ({ stickerSrc }) => {
  const stickerImg = useStickerImage(stickerSrc);

  return (
    <div>
      {stickerImg ? (
        <img src={stickerImg.src} alt="sticker" data-testid="sticker-image" />
      ) : null}
    </div>
  );
};

describe("useStickerImage Hook", () => {
  test("should load and set sticker image correctly", async () => {
    // Mock sticker source
    const stickerSrc = "sticker-src-url";

    // Mock Image object
    jest.spyOn(global, "Image").mockImplementation(() => {
      const img = document.createElement("img");
      setTimeout(() => {
        img.onload(); // Trigger the onload event
      }, 100);
      return img;
    });

    render(<TestComponent stickerSrc={stickerSrc} />);

    // Wait for the sticker image to appear in the document
    await waitFor(() => {
      const stickerImage = screen.getByTestId("sticker-image");
      expect(stickerImage).toBeInTheDocument();
      expect(stickerImage).toHaveAttribute(
        "src",
        expect.stringContaining(stickerSrc)
      );
    });

    // Restore the original Image implementation
    global.Image.mockRestore();
  });
});
