import React from "react";
import Widget from "./Widget.jsx";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouter } from "../../../../utils/testing/functions.js";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Widget component", () => {
  afterEach(cleanup);

  it("matches snapshot", () => {
    const { asFragment } = render(<Widget />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders w/o props", () => {
    renderWithRouter(<Widget />);
  });

  it("redirects on link button click", () => {
    renderWithRouter(
      <Widget
        linkTo={{
          text: "Перейти",
          address: "/requests/open",
        }}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/requests");
  });

  it("renders content", async () => {
    renderWithRouter(<Widget content="Pirog" />);
    expect(await screen.findByText(/Pirog/)).toBeInTheDocument();
  });
});
