import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestAccountSection from "../TestAccountSection";
import "@testing-library/jest-dom";

describe("TestAccountSection", () => {
  it("renders the test account section with correct title", () => {
    render(<TestAccountSection />);
    expect(screen.getByText("Test Account")).toBeInTheDocument();
  });

  it("displays the test email and password", () => {
    render(<TestAccountSection />);
    expect(screen.getByText("test@mail.com")).toBeInTheDocument();
    expect(screen.getByText("95iPYAeUkjcD8xR")).toBeInTheDocument();
  });

  it("has copy buttons for email and password", () => {
    render(<TestAccountSection />);
    const copyButtons = screen.getAllByTestId('ContentCopyIcon');
    expect(copyButtons).toHaveLength(2);
  });

  it("copies email to clipboard when copy button is clicked", async () => {
    render(<TestAccountSection />);
    const copyButtons = screen.getAllByTestId('ContentCopyIcon');
    await userEvent.click(copyButtons[0].closest('button')!);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test@mail.com");
  });

  it("copies password to clipboard when copy button is clicked", async () => {
    render(<TestAccountSection />);
    const copyButtons = screen.getAllByTestId('ContentCopyIcon');
    await userEvent.click(copyButtons[1].closest('button')!);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "95iPYAeUkjcD8xR"
    );
  });

  it("has a login button with correct href", () => {
    render(<TestAccountSection />);
    const loginButton = screen.getByRole("link", {
      name: /login with test account/i,
    });
    expect(loginButton).toHaveAttribute("href", "/auth/login");
  });
});
