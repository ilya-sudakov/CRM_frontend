import * as Functions from "./functions.jsx";
import { cleanup } from "@testing-library/react";
import testImage from "../../../../../assets/chat/send.svg";

describe("general functions", () => {
  afterEach(cleanup);

  // --- DATES --- //
  it("formats date string default", () => {
    const testingDate = new Date(2012, 0, 2);
    expect(Functions.formatDateString(testingDate)).toBe("02.01.2012");
  });

  it("formats date string with no date", () => {
    const testingDate = new Date(2012, 0, 2);
    expect(Functions.formatDateStringNoDate(testingDate)).toBe("01.2012");
    const testingDate2 = new Date(2012, 11, 2);
    expect(Functions.formatDateStringNoDate(testingDate2)).toBe("12.2012");
  });

  it("formats date string with no year", () => {
    const testingDate = new Date(2012, 0, 2);
    expect(Functions.formatDateStringNoYear(testingDate)).toBe("02.01");
  });

  it("formats date string with time", () => {
    const testingDate = new Date(2012, 0, 2, 15, 10);
    expect(Functions.formatDateStringWithTime(testingDate)).toBe(
      "02.01.2012 15:10"
    );
    const testingDate2 = new Date(2012, 11, 15, 1, 1);
    expect(Functions.formatDateStringWithTime(testingDate2)).toBe(
      "15.12.2012 01:01"
    );
  });

  it("formats date string to time", () => {
    const testingDate1 = new Date(2012, 0, 2, 15, 10);
    expect(Functions.formatDateStringToTime(testingDate1)).toBe("15:10");
    const testingDate2 = new Date(2012, 0, 2, 5, 1);
    expect(Functions.formatDateStringToTime(testingDate2)).toBe("05:01");
  });

  it("gets date difference", () => {
    const testingDate1 = new Date(2012, 0, 2);
    const testingDate2 = new Date(2012, 0, 5);
    expect(Functions.dateDiffInDays(testingDate1, testingDate2)).toBe(3);
  });

  // --- WORDS --- //
  it("gets correct word based on number divider", () => {
    const words = ["штука", "штуки", "штук"];
    expect(Functions.numberToString(1, words)).toBe("штука");
    expect(Functions.numberToString(2, words)).toBe("штуки");
    expect(Functions.numberToString(5, words)).toBe("штук");
    expect(Functions.numberToString(15, words)).toBe("штук");
  });

  it("adds space delimiter to big number", () => {
    expect(Functions.addSpaceDelimiter(1000000)).toEqual("1 000 000");
  });

  // --- IMAGES --- //
  //   it("gets an URI from an image", () => {
  //     expect(Functions.getDataUri(testImage));
  //   });

  //   it("downloads an image", () => {
  //     const URI = "abc123";
  //     expect(Functions.imgToBlobDownload(URI, "123.jpeg"));
  //   });

  // --- SORTING --- //
  it("changes sort order", () => {
    const eventFake = { target: { value: "name asc" } };
    expect(Functions.changeSortOrder(eventFake)).toEqual({
      curSort: "name",
      name: "asc",
    });
  });

  // --- DATA SCRAPPING FROM GIVEN OBJECTS/ARRAYS --- //
  it("gets products list from work data", () => {
    const workData = [
      {
        workControlProduct: [
          { product: { id: 1, name: "123" }, quantity: 3333 },
          { product: { id: 2, name: "321" }, quantity: 11 },
          { product: { id: 1, name: "123" }, quantity: 1111 },
        ],
      },
    ];
    const expectedProductsList = {
      1: { product: { id: 1, name: "123" }, name: "123", quantity: 4444 },
      2: { product: { id: 2, name: "321" }, name: "321", quantity: 11 },
    };
    expect(Functions.getAllProductsFromWorkCount(workData)).toEqual(
      expectedProductsList
    );
  });

  // --- COLORS --- //
  it("gets random color", () => {
    const randomColor = Functions.getRandomColor();
    expect(randomColor.length).toBe(7);
    expect(randomColor[0]).toEqual("#");
  });

  it("gets random nice color", () => {
    const randomColor = Functions.getRandomNiceColor();
    expect(randomColor.length).toBeGreaterThanOrEqual(10);
    expect(randomColor.length).toBeLessThanOrEqual(16);
    expect(randomColor.slice(0, 3)).toEqual("hsl");
  });

  it("gets random color shades", () => {
    const randomColor = Functions.getRandomColorShades(3);
    expect(randomColor.length).toBe(3);
    const randomColor2 = Functions.getRandomColorShades();
    expect(randomColor2.length).toBe(10);
  });

  it("adds up 2 colors", () => {
    const color1 = "333333";
    const color2 = "222222";
    expect(Functions.addHexColor(color1, color2)).toEqual("555555");
    expect(Functions.addHexColor("22", "11")).toEqual("000033");
  });

  // --- WORK HOURS --- //
  it("rounds up work hours", () => {
    expect(Functions.roundUpWorkHours(1000.5123)).toBe(1000.51);
    expect(Functions.roundUpWorkHours(1000)).toBe(1000);
  });
});
