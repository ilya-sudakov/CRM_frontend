import React from "react";
import LoginPage from "./LoginPage.jsx";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../utils/testing/functions.js";
import "@testing-library/jest-dom/extend-expect";
import "isomorphic-fetch";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("LoginPage component", () => {
  afterEach(cleanup);

  it("renders", () => {
    render(<LoginPage />);
  });

  it("renders when user is authorized", () => {
    renderWithRouter(<LoginPage isAuthorized={true} />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("logins in on button press", async () => {
    render(<LoginPage />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
  });

  it("signs out on button press", () => {
    renderWithRouter(<LoginPage isAuthorized={true} setUserData={() => {}} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
  });

  it("user inputs text in login&password fields", () => {
    renderWithRouter(<LoginPage />);
    const login = document.getElementById("login");
    const password = document.getElementById("password");
    fireEvent.click(login);
    fireEvent.change(login, { target: { value: "test" } });
    expect(login.value).toBe("test");
    fireEvent.keyDown(login, { key: "Enter", code: "Enter" });
    fireEvent.keyUp(login, { key: "Enter", code: "Enter" });
    fireEvent.focus(login);
    fireEvent.blur(login);

    fireEvent.click(password);
    fireEvent.change(password, { target: { value: "123123123" } });
    expect(password.value).toBe("123123123");
    fireEvent.keyDown(password, { key: "Enter", code: "Enter" });
    fireEvent.keyUp(password, { key: "Enter", code: "Enter" });
    fireEvent.focus(password);
    fireEvent.blur(password);
  });

  it("hides text in password fields", () => {
    renderWithRouter(<LoginPage />);
    const eye = document.getElementsByClassName("authorization__img--eye")[0];
    const line = document.getElementsByClassName("authorization__line")[0];
    fireEvent.click(eye);
    fireEvent.click(eye);
    fireEvent.click(line);
  });

  it("clicks remember me", () => {
    renderWithRouter(<LoginPage />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
  });
});
