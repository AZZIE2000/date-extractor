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
  week: number;
  day: number;
  hour: number;

  prev_year: number;
  prev_month: number;
  prev_month_year: number;
  prev_quarter: number;
  prev_quarter_year: number;
  curr_day: number;
  curr_quarter: number;
  days_of_year: number;

  last_year_date: string;
  last_date: string;

  day_date: string;
  month_name_en: string;
  month_name_ar: string;
}
const generateEmptyDateTime = (): DateTime => {
  return {
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
    curr_day: new Date().getDate(),
    days_of_year: 0,
    last_year_date: "",
    last_date: "",
    day_date: "",
    month_name_ar: "",
    month_name_en: "",
  };
};
class DateParser {
  private userPrompt: string;
  private result: DateTime = ;
  constructor(prompt: string) {
    this.userPrompt = prompt;
  }
  private init(){
    this.result.
  }
}
