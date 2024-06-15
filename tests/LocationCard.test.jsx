import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect } from "vitest";
import LocationCard from "../src/components/LocationCard/LocationCard";
import { deleteLocations } from "../src/utils/user.service";

vi.mock("../src/utils/user.service.js");

const mockLocation = "MockLocation";
const mockSelectLocation = vi.fn(() => {});
const mockUserId = "MockId";
const mockHandleLocations = vi.fn(() => {});

describe("Location card tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    render(
      <LocationCard
        location={mockLocation}
        selectLocation={mockSelectLocation}
        userId={mockUserId}
        handleLocations={mockHandleLocations}
      />
    );
  });

  it("should render location as text", () => {
    const locationText = screen.getByText(/MockLocation/i);

    expect(locationText).toBeInTheDocument();
  });

  it("should call deleteLocation when image is clicked", async () => {
    deleteLocations.mockReturnValue({
      status: 200,
    });

    const imgBtn = screen.getByRole("remove");
    await userEvent.click(imgBtn);

    expect(deleteLocations).toHaveBeenCalledWith({
      id: mockUserId,
      location: mockLocation,
    });
  });

  it("should call selectLocation when the location is clicked", async () => {
    const locationText = screen.getByText(/MockLocation/i);
    await userEvent.click(locationText);

    expect(mockSelectLocation).toHaveBeenCalled();
  });

  it("should call handleLocations when returning status 200", async () => {
    deleteLocations.mockReturnValue({
      status: 200,
    });

    const imgBtn = screen.getByRole("remove");
    await userEvent.click(imgBtn);

    expect(mockHandleLocations).toHaveBeenCalled();
  });

  it("should not call handleLocations when returning status 400", async () => {
    deleteLocations.mockReturnValue({
      status: 400,
    });

    const imgBtn = screen.getByRole("remove");
    await userEvent.click(imgBtn);

    expect(mockHandleLocations).not.toHaveBeenCalled();
  });
});
