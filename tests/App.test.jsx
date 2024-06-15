import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { getWeather } from "../src/utils/weather.service.js";

import testWeatherData from "./utils/TestWeatherData.json";

vi.mock("../src/utils/weather.service.js");
vi.mock("../src/utils/user.service.js");

import App from "../src/App.jsx";
import { getLocations, loginService } from "../src/utils/user.service.js";

const fillLoginForm = () => {
  const password = screen.getByPlaceholderText("Password");
  const username = screen.getByPlaceholderText("Username");
  fireEvent.input(username, { target: { value: "TestUsername" } });
  fireEvent.input(password, { target: { value: "TestPassword1!" } });
};

const renderScreen = () => {
  const routes = [
    {
      path: "/*",
      element: <App />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/*"],
  });
  render(<RouterProvider router={router} />);
};

const mockId = "TestId";

describe("App tests", () => {
  it("should call getWeather when handleSearch is called in the Navbar", async () => {
    getWeather.mockReturnValue(testWeatherData);
    getLocations.mockReturnValue({
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen();

    await waitFor(async () => {
      const loginBtn = screen.getByText(/Login/i);
      await userEvent.click(loginBtn);
    });

    const searchBox = screen.getByPlaceholderText("Location name...");
    fireEvent.input(searchBox, { target: { value: "TestSearch" } });

    const searchBtn = screen.getByText(/Search/i);
    await userEvent.click(searchBtn);

    expect(getWeather).toHaveBeenCalledWith("TestSearch");
  });

  it("should show the error modal when getWeather responds 404", async () => {
    getWeather.mockReturnValue({
      cod: "404",
      response: {
        data: {
          message: "Test Error Message",
        },
      },
    });
    getLocations.mockReturnValue({
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen();

    await waitFor(async () => {
      const loginBtn = screen.getByText(/Login/i);
      await userEvent.click(loginBtn);
    });

    await waitFor(async () => {
      const searchBox = screen.getByPlaceholderText("Location name...");
      fireEvent.input(searchBox, { target: { value: "TestSearch" } });

      const searchBtn = screen.getByText(/Search/i);
      await userEvent.click(searchBtn);
    });

    const errorMessage = screen.getByText(/Test Error Message/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should close the error Modal when handleModal is called", async () => {
    getWeather.mockReturnValue({
      cod: "404",
      response: {
        data: {
          message: "Test Error Message",
        },
      },
    });
    getLocations.mockReturnValue({
      data: {
        userLocations: ["TestLocation"],
      },
    });
    renderScreen();

    await waitFor(async () => {
      const loginBtn = screen.getByText(/Login/i);
      await userEvent.click(loginBtn);
    });

    await waitFor(async () => {
      const searchBox = screen.getByPlaceholderText("Location name...");
      fireEvent.input(searchBox, { target: { value: "TestSearch" } });

      const searchBtn = screen.getByText(/Search/i);
      await userEvent.click(searchBtn);
    });

    const closeBtn = screen.getByText("Close");
    await userEvent.click(closeBtn);

    const errorMessage = screen.queryByText(/Test Error Message/i);

    expect(errorMessage).not.toBeInTheDocument();
  });

  it("should set the userId and get rid of the loginBtn when on login", async () => {
    getWeather.mockReturnValue(testWeatherData);
    getLocations.mockReturnValue({
      data: {
        userLocations: ["TestLocation"],
      },
    });
    loginService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Message",
        user: "Test User",
      },
    });
    renderScreen();

    await waitFor(async () => {
      const loginBtn = screen.getByText(/Login/i);
      await userEvent.click(loginBtn);
    });

    fillLoginForm();

    await waitFor(async () => {
      const submitBtn = screen.getByRole("login");
      await userEvent.click(submitBtn);
    });

    await waitFor(async () => {
      const homeBtn = screen.getByText(/Home/i);
      await userEvent.click(homeBtn);
    });

    const loginBtn = screen.queryByText(/Login/i);

    expect(loginBtn).not.toBeInTheDocument();
  });

  it("should run selectLocation and update weather after login on click of location", async () => {
    getWeather.mockReturnValue(testWeatherData);
    getLocations.mockReturnValue({
      data: {
        userLocations: ["TestLocation"],
      },
    });
    loginService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Message",
        user: "Test User",
      },
    });
    renderScreen();

    await waitFor(async () => {
      const loginBtn = screen.getByText(/Login/i);
      await userEvent.click(loginBtn);
    });

    fillLoginForm();

    await waitFor(async () => {
      const submitBtn = screen.getByRole("login");
      await userEvent.click(submitBtn);
    });

    await waitFor(async () => {
      const savedLocBtn = screen.getByText(/My Favourite Locations/i);
      await userEvent.click(savedLocBtn);
    });

    const locationBtn = screen.getByText("TestLocation");
    await userEvent.click(locationBtn);

    expect(getWeather).toHaveBeenCalledWith("TestLocation");
  });

  it("should show the error modal if selectLocation gets an error response", async () => {
    getWeather.mockReturnValue({
      cod: "404",
      response: {
        data: {
          message: "Test Error Message",
        },
      },
    });
    getLocations.mockReturnValue({
      data: {
        userLocations: ["TestLocation"],
      },
    });
    loginService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Message",
        user: "Test User",
      },
    });
    renderScreen();

    await waitFor(async () => {
      const loginBtn = screen.getByText(/Login/i);
      await userEvent.click(loginBtn);
    });

    fillLoginForm();

    await waitFor(async () => {
      const submitBtn = screen.getByRole("login");
      await userEvent.click(submitBtn);
    });

    await waitFor(async () => {
      const savedLocBtn = screen.getByText(/My Favourite Locations/i);
      await userEvent.click(savedLocBtn);
    });

    const locationBtn = screen.getByText("TestLocation");
    await userEvent.click(locationBtn);

    const errorMessage = screen.getByText(/Test Error Message/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
