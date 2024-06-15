import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect } from "vitest";
import NavSearch from "../src/components/NavSearch/NavSearch";

const mockHandleSearch = vi.fn(() => {});
const mockSetSearchLocation = vi.fn(() => {});
const mockSearchLocation = "MockSearchLocation";

describe("NavSearch tests", () => {
  beforeEach(() => {
    render(
      <NavSearch
        handleSearch={mockHandleSearch}
        setSearchLocation={mockSetSearchLocation}
        searchLocation={mockSearchLocation}
      />
    );
  });

  it("should call setSearchLocation when text input", async () => {
    const searchBox = screen.getByPlaceholderText("Location name...");
    fireEvent.input(searchBox, { target: { value: "TestSearch" } });

    expect(mockSetSearchLocation).toHaveBeenCalled();
  });
});
