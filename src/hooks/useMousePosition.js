import { useRef, useEffect } from "react";

// Custom hook to track the mouse position on a given canvas element
const useMousePosition = (canvasRef) => {
  // A ref object to store the current mouse position (x, y coordinates)
  const mousePos = useRef({ x: 0, y: 0 });

  // Effect to add event listeners to track mouse movements and clicks on the canvas
  useEffect(() => {
    // Only proceed if the canvasRef is available
    if (canvasRef) {
      // Function to update the mouse position when the mouse moves or clicks
      const onMouseMove = (ev) => {
        // Update the mousePos ref with the current x and y coordinates from the event
        mousePos.current = { x: ev.clientX, y: ev.clientY };
      };

      // Add event listeners to the canvas for mousemove and mousedown events
      canvasRef.addEventListener("mousemove", onMouseMove);
      canvasRef.addEventListener("mousedown", onMouseMove);

      // Cleanup function to remove event listeners when the component unmounts or canvasRef changes
      return () => {
        canvasRef.removeEventListener("mousemove", onMouseMove);
        canvasRef.removeEventListener("mousedown", onMouseMove);
      };
    }
  }, [canvasRef]); // Run the effect when canvasRef changes

  // Return the current mouse position (ref object) for use in other components
  return mousePos;
};

export default useMousePosition;
