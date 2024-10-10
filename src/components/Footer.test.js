import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

const footer = {
  testId: "footer-text",
  testText: "© 2024 Company, Inc. All rights reserved.",
  sosmed: {
    fb: {
      testId: "link-facebook",
      url: "https://facebook.com",
    },
    x: {
      testId: "link-x",
      url: "https://x.com",
    },
    ig: {
      testId: "link-instagram",
      url: "https://instagram.com/",
    },
  },
};

describe("Footer should match the text copyright and have a correct link of facebook, x and instagram", () => {
  test("renders Footer should have a correct text", async () => {
    render(<Footer />);

    const text = screen.getByTestId(footer.testId);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(footer.testText);
  });

  test("renders Footer should have a correct link of facebook", async () => {
    render(<Footer />);

    const fbAnchor = screen.getByTestId(footer.sosmed.fb.testId);
    expect(fbAnchor).toBeInTheDocument();
    expect(fbAnchor).toHaveAttribute("href", footer.sosmed.fb.url);
  });

  test("renders Footer should have a correct link of x", async () => {
    render(<Footer />);

    const xAnchor = screen.getByTestId(footer.sosmed.x.testId);
    expect(xAnchor).toBeInTheDocument();
    expect(xAnchor).toHaveAttribute("href", footer.sosmed.x.url);
  });

  test("renders Footer should have a correct link of instagram", async () => {
    render(<Footer />);

    const igAnchor = screen.getByTestId(footer.sosmed.ig.testId);
    expect(igAnchor).toBeInTheDocument();
    expect(igAnchor).toHaveAttribute("href", footer.sosmed.ig.url);
  });
});
