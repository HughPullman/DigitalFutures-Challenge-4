import { render, screen } from "@testing-library/react";
import { beforeEach, expect } from "vitest";
import LogoutButton from "../src/components/LogoutButton/LogoutButton";
import userEvent from "@testing-library/user-event";

const mockHandleUserId = vi.fn(() => {});

describe("Logout Button tests", () => {
  beforeEach(() => {
    render(<LogoutButton handleUserId={mockHandleUserId} />);
  });

  it("should call handleuserId on click", async () => {
    const logoutBtn = screen.getByText(/Logout/i);
    await userEvent.click(logoutBtn);

    expect(mockHandleUserId).toHaveBeenCalled();
  });
});
