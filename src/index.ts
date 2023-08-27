import axios from "axios";

/**
 * curl ^
  -H "Authorization: Bearer XTTA326P36O52BV2WZVN345JHFV4265O" ^
  "https://api.wit.ai/message?v=20230825&q="
 */

const apiCall = async (userQuestion: string) => {
  axios
    .get(`https://api.wit.ai/message?v=20230825&q=${userQuestion}`, {
      headers: {
        Authorization: "Bearer XTTA326P36O52BV2WZVN345JHFV4265O",
      },
    })
    .then((res) => {
      console.log(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
console.log(new Date());

interface DateTime {
  year: number;
  quarter: number;
  month: number;
  week: number; // week of the year
  day: number;
  hour: number;

  prev_year: number;
  prev_month: number;
  prev_month_year: number; // the year of the previous month
  prev_quarter: number;
  prev_quarter_year: number; // the year of the previous quarter
  curr_day: number;
  curr_quarter: number;
  days_of_year: number; // days passed since the beginning of the asked year

  last_year_date: string; // last date ever in the year (31/12/2020) || 72/8/2023
  last_date: string; // today's date

  day_date: string; // the date of the asked about as in "sales last monday" 1/8/2023
  month_name_en: string;
  month_name_ar: string;
}

const emptyDateTime: DateTime = {
  year: 0,
  quarter: 0,
  month: 0,
  week: 0,
  day: 0,
  hour: 0,
  prev_month: 0,
  prev_month_year: 0,
  prev_quarter_year: 0,
  prev_quarter: 0,
  curr_quarter: 0,
  prev_year: 0,
  curr_day: 0,
  days_of_year: 0,
  last_year_date: "",
  last_date: "",
  day_date: "",
  month_name_ar: "",
  month_name_en: "",
};

class DateHelpers {
  protected date: Date;
  constructor(date: Date) {
    this.date = date;
  }
  public getMonthName(lang: "en" | "ar", month: number) {
    const monthNames = {
      en: [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july ",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],
      ar: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو ",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
    };
    return monthNames[lang][month];
  }
  // get year
  public getYear(dateObj: Date = this.date): number {
    return dateObj.getFullYear();
  }
  // get month
  public getMonth(dateObj: Date = this.date): number {
    return dateObj.getMonth() + 1;
  }
  // get week - this gets the week number of the year
  public getWeek(dateObj: Date = this.date) {
    const onejan = new Date(dateObj.getFullYear(), 0, 1);
    const days = Math.floor(
      (dateObj.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000)
    );
    const weekNumber = Math.ceil((days + onejan.getDay() + 1) / 7);
    return weekNumber;
  }

  public getDay(dateObj: Date = this.date): number {
    const dayNumber = dateObj.getDate();
    return dayNumber;
  }
  /**
   * @param dateObj
   * @returns a string of the date in the format of **dd/mm/yyyy**
   */
  public getDayDate(dateObj: Date = this.date): string {
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${dateObj.getDate()}/${month > 9 ? month : "" + month}/${year}`;
  }
  public getHour(dateObj: Date = this.date): number {
    const hour = dateObj.getHours();
    return hour;
  }
  public getPreviousMonth(dateObj: Date = this.date): number {
    const currentMonth = dateObj.getMonth();
    if (currentMonth === 0) {
      return 12;
    }
    return currentMonth;
  }
  public getPreviousMonthYear(dateObj: Date = this.date): number {
    const currentMonth = dateObj.getMonth();
    const currentYear = dateObj.getFullYear();
    if (currentMonth === 0) return currentYear - 1;
    return currentYear;
  }
  public getPreviousQuarterYear(dateObj: Date = this.date): number {
    const currentQuarter = Math.floor(dateObj.getMonth() / 3) + 1;
    const currentYear = dateObj.getFullYear();
    if (currentQuarter === 1) return currentYear - 1;
    return currentYear;
  }
  public getQuarter(dateObj: Date = this.date): number {
    return Math.floor(dateObj.getMonth() / 3) + 1;
  }
  public getPreviousQuarter(dateObj: Date = this.date): number {
    const currentQuarter = Math.floor(dateObj.getMonth() / 3) + 1;
    if (currentQuarter === 1) return 4;
    return currentQuarter - 1;
  }
  public getDaysPassed(dateObj: Date = this.date): number {
    const dt = new Date(dateObj);
    const currentYear = dt.getFullYear();
    const current = dt.getTime();
    const previous = new Date(currentYear, 0, 1).getTime();

    if (currentYear === dt.getFullYear()) {
      return Math.ceil((current - previous) / (24 * 60 * 60 * 1000));
    }

    return 365;
  }
  public getLastDate(dateObj: Date = this.date) {
    const dt = new Date();
    if (dateObj.getFullYear() === dt.getFullYear()) {
      const month = dt.getMonth() + 1;
      const day = dt.getDate();
      return `${month > 9 ? month : "0" + month}-${day > 9 ? day : "0" + day}`;
    }
    return `12-31`;
  }
  public getLastYearDate(dateObj: Date = this.date) {
    const dt = new Date();
    const year = dateObj.getFullYear();
    if (year === dt.getFullYear()) {
      const month = dt.getMonth() + 1;
      const day = dt.getDate();
      return `${year}-${month > 9 ? month : "0" + month}-${
        day > 9 ? day : "0" + day
      }`;
    }
    return `${year}-12-31`;
  }
}

export default class DateParser {
  private userPrompt: string;
  private result = emptyDateTime;

  resDate = "2024-02-28T23:00:00.000+03:00";
  private date: Date = new Date(this.resDate);

  constructor(prompt: string) {
    this.userPrompt = prompt;
  }
  private build() {
    const DTHelpers = new DateHelpers(this.date);
    this.result = {
      year: DTHelpers.getYear(),
      quarter: DTHelpers.getQuarter(),
      month: DTHelpers.getMonth(),
      week: DTHelpers.getWeek(),
      day: DTHelpers.getDay(),
      hour: DTHelpers.getHour(),
      prev_month_year: DTHelpers.getPreviousMonthYear(),
      prev_quarter_year: DTHelpers.getPreviousQuarterYear(),
      prev_month: DTHelpers.getPreviousMonth(),
      curr_day: DTHelpers.getDay(),
      curr_quarter: DTHelpers.getQuarter(),
      last_date: DTHelpers.getLastDate(),
      day_date: DTHelpers.getDayDate(),
      days_of_year: DTHelpers.getDaysPassed(),
      prev_quarter: DTHelpers.getPreviousQuarter(),
      last_year_date: DTHelpers.getLastYearDate(),
      prev_year: DTHelpers.getYear() - 1,
      month_name_ar: DTHelpers.getMonthName("ar", DTHelpers.getMonth()),
      month_name_en: DTHelpers.getMonthName("en", DTHelpers.getMonth()),
    };
  }
  
  private processPrompt() {
    // my own date parser
    // if faliure, use wit.ai\
    // if faliure, return new Date()

    this.date = new Date();
  }
  public execute() {
    this.processPrompt();
    this.build();
    return this.result;
  }
}

const res = new DateParser("hi").execute();
console.log(res);
