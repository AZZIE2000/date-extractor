import DateParser from "../src";
// const DateParser = require("../src/index.ts");
//  NOTE : normal cases
describe("day", () => {
  const date = new Date();
  it("day format one", () => {
    new DateParser("قبل 2 يوم").execute().then((result) => {
      expect(result.day).toBe(date.getDate() - 2);
    });
  });
});
