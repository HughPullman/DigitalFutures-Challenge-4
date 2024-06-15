import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import { getLocations } from "../src/utils/user.service";

import Navbar from "../src/components/Navbar/Navbar";

vi.mock("../src/utils/user.service.js");

const mockHandleSearch = vi.fn(() => {});
const mockSetSearchLocation = vi.fn(() => {});
const mockSearchLocation = "Test Location";
const mockHandleUserId = vi.fn(() => {});
const mockUserId = "TestId";
const mockBlankUserId = "";
const mockSelectLocation = vi.fn(() => {});

const renderScreen = (userId) => {
  const routes = [
    {
      path: "/",
      element: (
        <Navbar
          handleSearch={mockHandleSearch}
          setSearchLocation={mockSetSearchLocation}
          searchLocation={mockSearchLocation}
          handleUserId={mockHandleUserId}
          userId={userId}
          selectLocation={mockSelectLocation}
        />
      ),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);
};

describe("Navbar tests", () => {
  it("should render the 'Home' always", () => {
    renderScreen(mockUserId);
    const home = screen.getByText(/Home/i);

    expect(home).toBeInTheDocument();
  });

  it("should show the login button if there is no userId", () => {
    renderScreen(mockBlankUserId);
    const login = screen.getByText(/Login/i);

    expect(login).toBeInTheDocument();
  });

  it("should show the logout button if there is a userId", () => {
    renderScreen(mockUserId);
    const logout = screen.getByText(/Logout/i);

    expect(logout).toBeInTheDocument();
  });

  it("should show saved locations button if there is a userId", () => {
    renderScreen(mockUserId);
    const savedLocations = screen.getByText(/My Saved Locations/i);

    expect(savedLocations).toBeInTheDocument();
  });

  it("should call getLocations when the saved locations button is clicked", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen(mockUserId);

    const savedLocations = screen.getByText(/My Saved Locations/i);
    await userEvent.click(savedLocations);

    expect(getLocations).toHaveBeenCalledWith({ id: mockUserId });
  });

  it("shoulder render out the saved locations when the button is clicked", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen(mockUserId);

    const savedLocations = screen.getByText(/My Saved Locations/i);
    await userEvent.click(savedLocations);

    const locations = screen.getByText("TestLocation");
    expect(locations).toBeInTheDocument();
  });

  it("should render multiple locations if there are any", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation1", "TestLocation2"],
      },
    });
    renderScreen(mockUserId);

    const savedLocations = screen.getByText(/My Saved Locations/i);
    await userEvent.click(savedLocations);

    const location1 = screen.getByText("TestLocation1");
    const location2 = screen.getByText("TestLocation2");
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
  });

  it("should call selectLocation when a location is click on", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen(mockUserId);

    const savedLocations = screen.getByText(/My Saved Locations/i);
    await userEvent.click(savedLocations);

    const location = screen.getByText("TestLocation");
    await userEvent.click(location);

    expect(mockSelectLocation).toHaveBeenCalledWith("TestLocation");
  });
});
