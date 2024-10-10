import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";

const el = {
  image: "https://via.placeholder.com/150",
  name: "Test Recipe",
  rating: 4.5,
  tags: ["Tag1", "Tag2", "Tag3"],
  id: 1,
};

test("renders the component Card & given props", () => {
  render(<Card el={el} />);

  const img = screen.getByTestId(`img-recipe-${el.id}`);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", el.image);
  expect(img).toHaveAttribute("alt", `${el.name}`);

  const h5 = screen.getByTestId(`title-recipe-${el.id}`);
  expect(h5).toBeInTheDocument();
  expect(h5).toHaveTextContent(el.name);

  const p = screen.getByTestId(`rating-recipe-${el.id}`);
  expect(p).toBeInTheDocument();
  expect(p).toHaveTextContent(el.rating);

  const anchor = screen.getByTestId(`link-recipe-${el.id}`);
  expect(anchor).toBeInTheDocument();
  expect(anchor).toHaveAttribute(
    "href",
    `https://dummyjson.com/recipes/${el.id}`
  );
});
