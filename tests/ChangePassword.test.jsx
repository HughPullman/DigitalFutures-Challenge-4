import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ChangePassword from "../src/components/ChangePassword/ChangePassword";
import { expect } from "vitest";
import { changePassService } from "../src/utils/user.service";

vi.mock("../src/utils/user.service.js");

const fillForm = () => {
  const password = screen.getByPlaceholderText("Password");
  const username = screen.getByPlaceholderText("Username");
  const newPassword = screen.getByPlaceholderText("New Password");
  fireEvent.input(username, { target: { value: "TestUsername" } });
  fireEvent.input(password, { target: { value: "TestPassword1!" } });
  fireEvent.input(newPassword, {
    target: { value: "TestNewPassword1!" },
  });
};

describe("Change Password page tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/passChange",
        element: <ChangePassword />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/passChange"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render 'Change Password' as a title", () => {
    const changePassHeading = screen.getByText(/Change Password/i);

    expect(changePassHeading).toBeInTheDocument();
  });

  it("should call changePass api when submitted", async () => {
    changePassService.mockReturnValue({
      status: 200,
      data: {
        message: "",
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("submit");
    await userEvent.click(submitBtn);

    expect(changePassService).toHaveBeenCalledWith({
      username: "TestUsername",
      password: "TestPassword1!",
      newPassword: "TestNewPassword1!",
    });
  });

  it("should display SuccessModal with correct message when responding with 200", async () => {
    changePassService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Success Message",
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("submit");
    await userEvent.click(submitBtn);

    const successTitle = screen.getByText("Success");
    const successText = screen.getByText("Test Success Message");

    expect(successTitle).toBeInTheDocument();
    expect(successText).toBeInTheDocument();
  });

  it("should display ErrorModal with correct message when responding with 400", async () => {
    changePassService.mockReturnValue({
      status: 400,
      response: {
        data: {
          message: "Test Error Message",
        },
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("submit");
    await userEvent.click(submitBtn);

    const errorTitle = screen.getByText("Error");
    const errorText = screen.getByText("Test Error Message");

    expect(errorTitle).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });

  it("should display the correct ErrorModal if the newPassword is not correct", async () => {
    const password = screen.getByPlaceholderText("Password");
    const username = screen.getByPlaceholderText("Username");
    const newPassword = screen.getByPlaceholderText("New Password");
    fireEvent.input(username, { target: { value: "TestUsername" } });
    fireEvent.input(password, { target: { value: "TestPassword1!" } });
    fireEvent.input(newPassword, {
      target: { value: "FailnewPassword" },
    });

    const submitBtn = screen.getByRole("submit");
    await userEvent.click(submitBtn);

    const errorTitle = screen.getByText("Error");
    const errorText = screen.getByText(
      "Password must be at least 8 characters with, a uppercase, a number and a special character"
    );

    expect(errorTitle).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });

  it("should close the successModal when the close button is clicked", async () => {
    changePassService.mockReturnValue({
      status: 200,
      data: {
        message: "Test Success Message",
      },
    });
    fillForm();

    const submitBtn = screen.getByRole("submit");
    await userEvent.click(submitBtn);

    const closeBtn = screen.getByRole("close");
    await userEvent.click(closeBtn);

    const modalText = screen.queryAllByText("Test Success Message");

    expect(modalText).toEqual([]);
  });
});
