import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "./NavBar";

const nav = {
  testId: "my-recipe",
  expectedVal: "My Recipe",
};

const mockSearch = jest.fn();

describe("Navbar should have correct value and perform some action if input submitted", () => {
  test("renders Nav should have a correct text", async () => {
    render(<Navbar search={mockSearch} />);

    const text = screen.getByTestId(nav.testId);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(nav.expectedVal);
  });

  test("Nav should handle search input and give the correct return", async () => {
    render(<Navbar search={mockSearch} />);

    const input = screen.getByRole("searchbox");
    const form = screen.getByTestId("form-search");

    fireEvent.change(input, { target: { value: "Chip" } });
    expect(input.value).toBe("Chip");
    expect(form).toBeInTheDocument();

    fireEvent.submit(form);
    expect(mockSearch).toHaveBeenCalledWith("Chip");
    expect(input.value).toBe("");
  });
});
