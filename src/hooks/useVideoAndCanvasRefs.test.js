import React from "react";
import { render, screen } from "@testing-library/react";
import useVideoAndCanvasRefs from "./useVideoAndCanvasRefs";

// A simple component to test useVideoAndCanvasRefs hook
const TestComponent = () => {
  const { videoRef, canvasRef, onVideoRef, onCanvasRef } =
    useVideoAndCanvasRefs();
  return (
    <div>
      <video ref={onVideoRef} data-testid="video-element" />
      <canvas ref={onCanvasRef} data-testid="canvas-element" />
      <div>Video and Canvas Test</div>
    </div>
  );
};

describe("useVideoAndCanvasRefs Hook", () => {
  test("should update video and canvas refs correctly", () => {
    render(<TestComponent />);

    // Check video and canvas elements are in the document
    const videoElement = screen.getByTestId("video-element");
    const canvasElement = screen.getByTestId("canvas-element");

    expect(videoElement).toBeInTheDocument();
    expect(canvasElement).toBeInTheDocument();

    // Check that refs are assigned correctly
    expect(videoElement.tagName).toBe("VIDEO");
    expect(canvasElement.tagName).toBe("CANVAS");
  });
});
