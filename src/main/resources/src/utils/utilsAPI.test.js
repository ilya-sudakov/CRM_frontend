import * as requests from "./utilsAPI.jsx";
import { cleanup } from "@testing-library/react";
import "isomorphic-fetch";

describe("general functions", () => {
  afterEach(cleanup);

  it("fetches data", () => {
    const options = { url: "http://localhost:8443", method: "GET" };
    expect(requests.request(options));
    expect(requests.request(options, "form-data"));
  });

  it("fetches data from inn server", () => {
    const options = { url: "http://localhost:8443", method: "GET" };
    expect(requests.requestINN(options));
    expect(requests.requestINN(options, "form-data"));
  });
});
