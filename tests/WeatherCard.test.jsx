import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import WeatherCard from "../src/components/WeatherCard/WeatherCard";

const mockWeather = [
  {
    date: "2024-06-12",
    weather_desc: "Test",
  },
  { date: "2024-06-13", weather_desc: "Test" },
  { date: "2024-06-14", weather_desc: "Test" },
  { date: "2024-06-15", weather_desc: "Test" },
  { date: "2024-06-16", weather_desc: "Test" },
];

const renderScreen = (day) => {
  render(<WeatherCard weather={mockWeather} day={day} />);
};

describe("WeatherCard tests", () => {
  it("should contain wednesday with day 0", async () => {
    renderScreen(0);

    const dayOfWeek = screen.getByText("Wednesday");

    expect(dayOfWeek).toBeInTheDocument();
  });
});
describe("WeatherCard tests", () => {
  it("should contain thursday with day 1", async () => {
    renderScreen(1);

    const dayOfWeek = screen.getByText("Thursday");

    expect(dayOfWeek).toBeInTheDocument();
  });
});
describe("WeatherCard tests", () => {
  it("should contain Friday with day 2", async () => {
    renderScreen(2);

    const dayOfWeek = screen.getByText("Friday");

    expect(dayOfWeek).toBeInTheDocument();
  });
});
describe("WeatherCard tests", () => {
  it("should contain Saturday with day 3", async () => {
    renderScreen(3);

    const dayOfWeek = screen.getByText("Saturday");

    expect(dayOfWeek).toBeInTheDocument();
  });
});

describe("WeatherCard tests", () => {
  it("should contain Sunday with day 4", async () => {
    renderScreen(4);

    const dayOfWeek = screen.getByText("Sunday");

    expect(dayOfWeek).toBeInTheDocument();
  });
});
