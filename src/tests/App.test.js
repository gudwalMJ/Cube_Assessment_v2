import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

test("renders SlapSticker title", () => {
  render(
    <MemoryRouter>
      {" "}
      {/* Wrap App in MemoryRouter */}
      <App />
    </MemoryRouter>
  );
  const title = screen.getByText(/SlapSticker/i);
  expect(title).toBeInTheDocument();
});
