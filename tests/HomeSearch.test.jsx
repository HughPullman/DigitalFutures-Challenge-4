import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import HomeSearch from "../src/components/HomeSearch/HomeSearch";

const mockSetSearchLocation = vi.fn(() => {});
const mockHandleSearch = vi.fn(() => {});
const mockSearchLocation = "MockSearchLocation";

describe("HomeSearch tests", () => {
  beforeEach(() => {
    render(
      <HomeSearch
        setSearchLocation={mockSetSearchLocation}
        handleSearch={mockHandleSearch}
        searchLocation={mockSearchLocation}
      />
    );
  });

  it("should call setSearchLocation on input change", async () => {
    const searchBox = screen.getByPlaceholderText("Location name...");
    fireEvent.input(searchBox, { target: { value: "TestSearch" } });

    expect(mockSetSearchLocation).toHaveBeenCalled();
  });
});
