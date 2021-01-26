import React from "react";
import { cleanup, screen } from "@testing-library/react";
import MainPage from "./MainPage.jsx";
import "@testing-library/jest-dom/extend-expect";
// import { renderWithRouterAndContext } from "../../utils/testing/functions.js";

describe("MainPage component", () => {
  afterEach(cleanup);

  // it("renders w/ router & context", () => {
  //   renderWithRouterAndContext(<MainPage />);
  // });

  // it("matches snapshot", () => {
  //   const { asFragment } = renderWithRouterAndContext(<MainPage />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
