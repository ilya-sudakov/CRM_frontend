import React from "react";
import CheckBox from "./CheckBox.jsx";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";

describe("CheckBox component", () => {
  afterEach(cleanup);

  it("matches snapshot", () => {
    const { asFragment } = render(<CheckBox />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders w/o props", () => {
    render(<CheckBox />);
  });

  it("becomes checked", () => {
    let checked = false;
    render(
      <CheckBox
        name="test"
        checked={checked}
        onChange={(value) => (checked = value)}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checked).toBe(true);
  });
});
