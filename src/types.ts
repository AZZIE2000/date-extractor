export interface DateTime {
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
