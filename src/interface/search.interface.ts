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

interface DateTimeBool {
  year: boolean;
  quarter: boolean;
  month: boolean;
  week: boolean;
  day: boolean;
}

type TokenizedQT = Array<string>;

enum LangId {
  en = 2,
  ar = 1,
}

type LangToken = {
  id: LangId;
  value: string;
};

type TokenizedNumber = {
  match: boolean;
  value: number;
  index: number;
};

type DateTimeSearchResult = {
  dateTime: DateTime;
  dateTimeBool: DateTimeBool;
  question: TokenizedQT;
};
