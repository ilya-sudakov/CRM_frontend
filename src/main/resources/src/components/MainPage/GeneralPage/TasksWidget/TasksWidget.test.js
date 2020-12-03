import React from "react";
import TasksWidget from "./TasksWidget.jsx";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithRouterAndContext } from "../../../../utils/testing/functions.js";
import "isomorphic-fetch";

afterEach(cleanup);

describe("TasksWidget component", () => {
  it("renders", () => {
    renderWithRouterAndContext(<TasksWidget />);
  });

  it("matches snapshot", () => {
    const { asFragment } = renderWithRouterAndContext(<TasksWidget />);
    expect(asFragment()).toMatchSnapshot();
  });
});
