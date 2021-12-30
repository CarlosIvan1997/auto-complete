import React from "react";
import { render, screen } from "@testing-library/react";
import AutoCompleteContainer from "./AutoCompleteContainer";

test("renders learn react link", () => {
  render(<AutoCompleteContainer />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
