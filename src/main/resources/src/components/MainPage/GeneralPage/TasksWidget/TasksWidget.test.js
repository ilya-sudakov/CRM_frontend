import React from "react";
import TasksWidget from "./TasksWidget.jsx";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { renderWithRouterAndContext } from "../../../../utils/testing/functions.js";
import {
  filterTasks,
  filterTasksByUser,
  getTasksControlDatesList,
  getTasksList,
} from "./functions.js";
import "isomorphic-fetch";

afterEach(cleanup);

describe("TasksWidget component", () => {
  //COMPONENT
  it("renders", () => {
    renderWithRouterAndContext(<TasksWidget />);
  });

  it("matches snapshot", () => {
    const { asFragment } = renderWithRouterAndContext(<TasksWidget />);
    expect(asFragment()).toMatchSnapshot();
  });

  // FUNCTIONS
  it("filters tasks", () => {
    const tasks = [{ condition: "Выполнено" }, { condition: "123" }];
    const expectedTasks = [{ condition: "123" }];
    expect(filterTasks(tasks)).toEqual(expectedTasks);
  });

  it("filters tasks by User", () => {
    const tasks = [
      { condition: "Выполнено" },
      { condition: "123", responsible: "admin" },
    ];
    const expectedTasks = [{ condition: "123", responsible: "admin" }];
    expect(filterTasksByUser(tasks)).toEqual(expectedTasks);
  });

  it("fetches tasks list", () => {
    expect(getTasksList());
  });

  it("getTasksControlDates", () => {
    const tasks = [
      { condition: "Выполнено", dateControl: new Date(2012, 1, 1) },
      {
        condition: "123",
        responsible: "admin",
        dateControl: new Date(2012, 1, 1),
      },
    ];
    const expectedDates = {
      "Wed Feb 01 2012 00:00:00 GMT+0400 (GMT+03:00)": [
        { condition: "Выполнено", dateControl: new Date(2012, 1, 1) },
        {
          condition: "123",
          responsible: "admin",
          dateControl: new Date(2012, 1, 1),
        },
      ],
    };
    expect(getTasksControlDatesList(tasks)).toEqual(expectedDates);
  });
});
