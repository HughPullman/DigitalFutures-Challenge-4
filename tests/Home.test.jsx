import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import Home from "../src/components/Home/Home";

const mockHandleSearch = vi.fn(() => {});
const mockSearchLocation = "MockLocation";
const mockSetSearchLocation = vi.fn(() => {});

describe("Home page tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/",
        element: (
          <Home
            handleSearch={mockHandleSearch}
            searchLocation={mockSearchLocation}
            setSearchLocation={mockSetSearchLocation}
          />
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render 'Tell me about...' on load", async () => {
    const homeHead = screen.getByText(/Tell me about.../i);
    expect(homeHead).toBeInTheDocument();
  });

  //   it("should call the handleSearch with location when the form is submitted", async () => {
  //     const searchBtn = screen.getByText(/Search/i);
  //     await userEvent.click(searchBtn);

  //     expect(mockSetSearchLocation).toHaveBeenCalledWith({
  //       location: "MockLocation",
  //     });
  //   });
});
