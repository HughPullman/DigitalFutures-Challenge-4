import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import TestWeatherData from "./utils/TestWeatherData.json";
import WeatherOnly from "../src/components/WeatherOnly/WeatherOnly";

import {
  addLocation,
  deleteLocations,
  getLocations,
} from "../src/utils/user.service";

vi.mock("../src/utils/user.service.js");

const testWeatherData = TestWeatherData;
const mockUserId = "TestId";
const mockBlankUserId = "";

const renderScreen = (userId) => {
  const routes = [
    {
      path: "/weatherOnly",
      element: <WeatherOnly weatherData={testWeatherData} userId={userId} />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/weatherOnly"],
  });

  render(<RouterProvider router={router} />);
};

describe("Weather Only page Tests,", () => {
  it("should render 'Telling you about...' as a title", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen(mockUserId);

    const weatherTitle = screen.getByText(/Telling you about.../i);

    expect(weatherTitle).toBeInTheDocument();
  });

  it("should deleteLocation if city.name is in the data and addFav is clicked", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["Dublin"],
      },
    });
    deleteLocations.mockReturnValue({
      status: 200,
    });
    renderScreen(mockUserId);

    const favBtn = screen.queryByRole("handleFav");
    await userEvent.click(favBtn);

    expect(deleteLocations).toHaveBeenCalledWith({
      id: mockUserId,
      location: "Dublin",
    });
  });

  it("should addLocation if city.name is not in the data and addFav is clicked", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestNotInData"],
      },
    });
    addLocation.mockReturnValue({
      status: 200,
    });
    renderScreen(mockUserId);

    const favBtn = screen.queryByRole("handleFav");
    await userEvent.click(favBtn);

    expect(addLocation).toHaveBeenCalledWith({
      id: mockUserId,
      location: "Dublin",
    });
  });

  it("should not render add/removeFavourites if there is blank userId", async () => {
    getLocations.mockReturnValue({
      status: 200,
      data: {
        userLocations: ["TestNotInData"],
      },
    });
    renderScreen(mockBlankUserId);

    const favBtn = screen.queryByRole("handleFav");

    expect(favBtn).not.toBeInTheDocument();
  });
});
