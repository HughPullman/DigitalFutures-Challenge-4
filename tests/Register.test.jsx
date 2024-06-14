import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";

import Register from "../src/components/Register/Register";
import { registerService } from "../src/utils/user.service";

vi.mock("../src/utils/user.service.js");

const fillForm = () => {
  const password = screen.getByPlaceholderText("Password");
  const username = screen.getByPlaceholderText("Username");
  fireEvent.input(username, { target: { value: "TestUsername" } });
  fireEvent.input(password, { target: { value: "TestPassword1!" } });
};

describe("Register screen tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/register",
        element: <Register />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/register"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render 'Register' on load", () => {
    const registerTxt = screen.getByText(/Register/i);

    expect(registerTxt).toBeInTheDocument();
  });

  it("should call the register service when the form is submitted", async () => {
    registerService.mockReturnValue({
      status: 201,
    });

    fillForm();

    const submitBtn = screen.getByText(/Register/i);
    await userEvent.click(submitBtn);

    expect(registerService).toHaveBeenCalledWith({
      username: "TestUsername",
      password: "TestPassword1!",
    });
  });
});
