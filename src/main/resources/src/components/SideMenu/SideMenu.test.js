import React from "react";
import { cleanup, screen } from "@testing-library/react";
import SideMenu from "./SideMenu.jsx";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouterAndContext } from "../../utils/testing/functions.js";

describe("Sidemenu component", () => {
  afterEach(cleanup);

  it("renders w/ router & context", () => {
    renderWithRouterAndContext(<SideMenu />);
  });

  it("matches snapshot", () => {
    const { asFragment } = renderWithRouterAndContext(<SideMenu />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("is hidden", () => {
    renderWithRouterAndContext(<SideMenu hidden={true} />);
  });
});
