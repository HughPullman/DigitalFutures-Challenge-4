import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";

import Login from "../src/components/Login/Login";
import { loginService } from "../src/utils/user.service";

vi.mock("../src/utils/user.service.js");

const mockHandleUserId = vi.fn(() => {});

const fillForm = () => {
  const password = screen.getByPlaceholderText("Password");
  const username = screen.getByPlaceholderText("Username");
  fireEvent.input(username, { target: { value: "TestUsername" } });
  fireEvent.input(password, { target: { value: "TestPassword1!" } });
};

describe("Login screen tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/login",
        element: <Login handleUserId={mockHandleUserId} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render 'Login' as a button", () => {
    const loginTxt = screen.getByText(/Login/i);

    expect(loginTxt).toBeInTheDocument();
  });

  it("should call the login service when the form is submitted", async () => {
    loginService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Message",
        user: "Test User",
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("login");
    await userEvent.click(submitBtn);

    expect(loginService).toHaveBeenCalledWith({
      username: "TestUsername",
      password: "TestPassword1!",
    });
  });

  it("should display success modal with message when response status 200", async () => {
    loginService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Message",
        user: "Test User",
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("login");
    await userEvent.click(submitBtn);

    const successTitle = screen.getByText("Success");
    const successText = screen.getByText("Test Message");

    expect(successText).toBeInTheDocument();
    expect(successTitle).toBeInTheDocument();
  });

  it("should display ErrorModal with message when responding with 400", async () => {
    loginService.mockReturnValue({
      status: 400,
      response: {
        data: {
          message: "Test Error Message",
        },
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("login");
    await userEvent.click(submitBtn);

    const errorTitle = screen.getByText("Error");
    const errorText = screen.getByText("Test Error Message");

    expect(errorText).toBeInTheDocument();
    expect(errorTitle).toBeInTheDocument();
  });

  it("should close the successModal when calling handleClose", async () => {
    loginService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Message",
        user: "Test User",
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("login");
    await userEvent.click(submitBtn);

    const closeBtn = screen.getByRole("close");
    await userEvent.click(closeBtn);

    const modalText = screen.queryAllByText("Test Message");

    expect(modalText).toEqual([]);
  });
});
