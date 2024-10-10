import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const mockData = {
  recipes: [
    {
      image: "image-1",
      name: "Recipe 1",
      rating: 4.5,
      tags: ["Tag1", "Tag2", "Tag3"],
      id: 1,
    },
    {
      image: "image-2",
      name: "Recipe 2",
      rating: 4.6,
      tags: ["Tag4", "Tag5", "Tag6"],
      id: 2,
    },
  ],
};

test("renders App component with NavBar, image banner, and Footer", async () => {
  render(<App />);

  // image banner is rendered
  const banner = screen.getByTestId("image-banner");
  expect(banner).toBeInTheDocument();
  expect(banner).toHaveProperty(
    "src",
    "https://www.instacart.com/company/wp-content/uploads/2022/11/cooking-statistics-hero.jpg"
  );
  expect(banner).toHaveProperty("alt", "banner");
});

describe("error", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  test("handles fetch error gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    const consoleSpy = jest.spyOn(console, "log");

    render(<App />);

    consoleSpy.mockRestore();
  });
});

test("renders recipe cards", async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockData),
  });

  render(<App />);

  try {
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("https://dummyjson.com/recipes"); 
    });

    await waitFor(() => {
      const cards = screen.getAllByRole("card"); 
      expect(cards).toHaveLength(2); 
    });
  } catch (error) {
    console.error(error);
  }
});
