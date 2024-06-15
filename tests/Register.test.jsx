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

  it("should display success modal with correct message when status 201", async () => {
    registerService.mockReturnValue({
      status: 201,
    });

    fillForm();

    const submitBtn = screen.getByText(/Register/i);
    await userEvent.click(submitBtn);

    const successTitle = screen.getByText("Success");
    const successText = screen.getByText("Successfully created account");

    expect(successText).toBeInTheDocument();
    expect(successTitle).toBeInTheDocument();
  });

  it("should display error modal with correct message when status 400", async () => {
    registerService.mockReturnValue({
      status: 400,
      response: {
        data: "Test Error Message",
      },
    });

    fillForm();

    const submitBtn = screen.getByText(/Register/i);
    await userEvent.click(submitBtn);

    const errorTitle = screen.getByText("Error");
    const errorText = screen.getByText("Test Error Message");

    expect(errorText).toBeInTheDocument();
    expect(errorTitle).toBeInTheDocument();
  });

  it("should close the successModal when calling handleClose", async () => {
    registerService.mockReturnValue({
      status: 201,
    });

    fillForm();

    const submitBtn = screen.getByText(/Register/i);
    await userEvent.click(submitBtn);

    const closeBtn = screen.getByRole("close");
    await userEvent.click(closeBtn);

    const modalText = screen.queryAllByText("Successfully created account");

    expect(modalText).toEqual([]);
  });

  it("should load the error modal with the correct message with an invalid password", async () => {
    const password = screen.getByPlaceholderText("Password");
    const username = screen.getByPlaceholderText("Username");
    fireEvent.input(username, { target: { value: "TestUsername" } });
    fireEvent.input(password, { target: { value: "TestBadPass" } });

    const submitBtn = screen.getByText(/Register/i);
    await userEvent.click(submitBtn);

    const errorTitle = screen.getByText("Error");
    const errorText = screen.getByText(
      "Password must be at least 8 characters with, a uppercase, a number and a special character"
    );

    expect(errorText).toBeInTheDocument();
    expect(errorTitle).toBeInTheDocument();
  });
});
