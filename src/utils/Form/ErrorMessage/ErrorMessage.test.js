import React from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
// import { renderWithRouter } from "../../../utils/testing/functions.js";
import "@testing-library/jest-dom/extend-expect";

describe("ErrorMessage component", () => {
  afterEach(cleanup);

  it("renders", () => {
    render(<ErrorMessage />);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<ErrorMessage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("closes window", () => {
    let showError = true;
    render(
      <ErrorMessage
        showError={showError}
        setShowError={(value) => (showError = value)}
      />
    );
    const exitButton = document.getElementsByClassName("window_error__exit")[0];
    const exitBar = document.getElementsByClassName("window_error__bar")[0];
    const button = document.getElementsByClassName("main-window__button")[0];
    fireEvent.click(exitButton);
    expect(showError).toBe(false);
    fireEvent.click(exitBar);
    fireEvent.click(button);
  });
});
