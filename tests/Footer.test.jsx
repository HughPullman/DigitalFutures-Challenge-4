import { beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer/Footer";

describe("Footer test", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("should render 2024 DFCorp", () => {
    const footerText = screen.getByText(/2024 DFCorp/i);

    expect(footerText).toBeInTheDocument();
  });
});
