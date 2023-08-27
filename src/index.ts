import axios from "axios";

const resDate = "2023-08-27T17:00:00.000+03:00";

const dateObj = new Date(resDate);
const month = dateObj.getMonth();
console.log(month);

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

  day_date: string; // the date of the asked about as in "sales last monday"
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
class dateHelpers {
  getMonthName(lang: "en" | "ar", month: number) {
    const monthNames = {
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July ",
        "August",
        "September",
        "October",
        "November",
        "December",
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
}
class DateParser {
  private userPrompt: string;
  private result = emptyDateTime;

  constructor(prompt: string) {
    this.userPrompt = prompt;
    this.init();
  }

  private init() {}
  // get year
  private getYear(dateObj: Date = new Date()): number {
    return dateObj.getFullYear();
  }
  // get month
  private getMonth(dateObj: Date = new Date()): number {
    return dateObj.getMonth();
  }
  // get week - this gets the week number of the year
  private getWeek(dateObj: Date = new Date()) {
    const onejan = new Date(dateObj.getFullYear(), 0, 1);
    const days = Math.floor(
      (dateObj.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000)
    );
    const weekNumber = Math.ceil((days + onejan.getDay() + 1) / 7);
    return weekNumber;
  }

  private getDay(dateObj: Date = new Date()): number {
    const dayNumber = dateObj.getDate();
    return dayNumber;
  }
  getHour(dateObj: Date = new Date()): number {
    const hour = dateObj.getHours();
    return hour;
  }
  getPreviousMonth(dateObj: Date = new Date()): number {
    const currentMonth = dateObj.getMonth();
    if (currentMonth === 0) {
      return 12;
    }
    return currentMonth;
  }
}
