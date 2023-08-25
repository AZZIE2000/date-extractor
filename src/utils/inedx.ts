interface DateTime {
  year: number
  quarter: number
  month: number
  week: number
  day: number
  hour: number

  prev_year: number
  prev_month: number
  prev_month_year: number
  prev_quarter: number
  prev_quarter_year: number
  curr_day: number
  curr_quarter: number
  days_of_year: number

  last_year_date: string
  last_date: string

  day_date: string
  month_name_en: string
  month_name_ar: string
}
export const generateEmptyDateTime = (): DateTime => {
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
