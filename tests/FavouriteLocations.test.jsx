import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import FavouriteLocations from "../src/components/FavouriteLocations/FavouriteLocations";
import { getLocations, deleteLocations } from "../src/utils/user.service";

vi.mock("../src/utils/user.service.js");

const mockUserId = "1";
const mockBlankId = "";
const mockSelectLocation = vi.fn(() => {});

const renderScreen = (userId) => {
  const routes = [
    {
      path: "/favouriteLocations",
      element: (
        <FavouriteLocations
          userId={userId}
          selectLocation={mockSelectLocation}
        />
      ),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/favouriteLocations"],
  });
  render(<RouterProvider router={router} />);
};

describe("Favourite Locations page tests", () => {
  it("should render 'Favourite Locations' as a title on the page", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation"],
      },
    });

    renderScreen(mockUserId);

    const favLocationsHeading = screen.getByText(/Favourite Locations/i);

    expect(favLocationsHeading).toBeInTheDocument();
  });

  it("should call getLocations with the userId on page load", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen(mockUserId);

    expect(getLocations).toHaveBeenCalledWith({ id: mockUserId });
  });

  it("should render 'Please login etc.' when user id is blank", async () => {
    renderScreen(mockBlankId);

    const favLocationText = screen.getByText(
      /Please Login to see Favourite Locations/i
    );

    expect(favLocationText).toBeInTheDocument();
  });

  it("should render the location name that it gets from getLocations", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen(mockUserId);

    await waitFor(() => {
      const locationText = screen.getByText(/TestLocation/i);
      expect(locationText).toBeInTheDocument();
    });
  });
});
