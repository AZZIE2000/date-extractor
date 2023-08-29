import DateParser from "../src";
// const DateParser = require("../src/index.ts");
//  NOTE : normal cases
  describe("day", () => {
    const date = new Date();
    it("day format one", () => {
      const result = new DateParser("قبل 2 يوم").execute();
      
      
      expect(result.day).toBe(date.getDate() - 2);
    });

    
  });

