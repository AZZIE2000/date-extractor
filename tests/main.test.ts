import DateParser from "../src";
// const DateParser = require("../src/index.ts");
describe("main cases", () => {
  it("no case", () => {
    const result = new DateParser("").execute();
    const date = new Date();
    expect(result.year).toBe(date.getFullYear());
  });
});
describe("edge cases", () => {
  it("no case", () => {
    const result = new DateParser("").execute();
    const date = new Date();
    expect(result.year).toBe(date.getFullYear());
  });
});
