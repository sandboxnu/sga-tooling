import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders menu", () => {
  render(<App />);
  const footerText = screen.getByText(/Made by students/i);
  expect(footerText).toBeInTheDocument();
});
