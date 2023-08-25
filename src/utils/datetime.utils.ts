import months from "../data/Month";
// import { DateTime } from "../interface/search.interface";

const getDaysPassed = (year: number) => {
  const dt = new Date();
  if (year === dt.getFullYear()) {
    var current = new Date(dt.getTime()).getTime();
    var previous = new Date(dt.getFullYear(), 0, 1).getTime();
    return Math.ceil((current - previous + 1) / 86400000);
  }
  return 365;
};

const getLastYearDate = (year: number) => {
  const dt = new Date();
  if (year === dt.getFullYear()) {
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    return `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    }`;
  }
  return `${year}-12-31`;
};

const getLastDate = (year: number) => {
  const dt = new Date();
  if (year === dt.getFullYear()) {
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    return `${month > 9 ? month : "0" + month}-${day > 9 ? day : "0" + day}`;
  }
  return `12-31`;
};

const getYear = (date: Date | undefined): number => {
  return date ? date.getFullYear() : new Date().getFullYear();
};

const getPrevQuarter = (
  year: any,
  quarter: any
): { prev_quarter_year: number; prev_quarter: number } => {
  if (quarter === 1) {
    return {
      prev_quarter_year: year - 1,
      prev_quarter: 4,
    };
  }
  return {
    prev_quarter_year: year,
    prev_quarter: quarter - 1,
  };
};

const getMonthNames = (
  month: any
): { month_name_ar: string; month_name_en: string } => {
  if (!month || !months) {
    return { month_name_ar: "", month_name_en: "" };
  }

  return {
    month_name_ar: months.find((a) => a.month_value === month && a.lang === 1)!
      .month_name,
    month_name_en: months.find((a) => a.month_value === month && a.lang === 2)!
      .month_name,
  };
};

const getPrevMonth = (
  year: any,
  month: any
): { prev_month_year: number; prev_month: number } => {
  if (month === 1) {
    return {
      prev_month_year: year - 1,
      prev_month: 12,
    };
  }
  return {
    prev_month_year: year,
    prev_month: month - 1,
  };
};

export const getTimeToDate = (someDate: Date): DateTime => {
  var today = someDate ? new Date(someDate) : new Date();
  const quarter = Math.floor(today.getMonth() / 3) + 1;
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  return {
    year,
    prev_year: year - 1,
    quarter,
    month,
    week: getWeekNumber(today),
    last_year_date: getLastYearDate(year),
    last_date: getLastDate(year),
    day: today.getDate(),
    day_date: `${today.getDate()}/${month > 9 ? month : "" + month}/${year}`,
    curr_day: today.getDate(),
    days_of_year: getDaysPassed(year),
    hour: today.getHours(),
    curr_quarter: Math.floor(new Date().getMonth() / 3) + 1,
    month_name_ar: months.find((a) => a.month_value === month && a.lang === 1)!
      .month_name,
    month_name_en: months.find((a) => a.month_value === month && a.lang === 2)!
      .month_name,
    ...getPrevQuarter(year, quarter),
    ...getPrevMonth(year, month),
  };
};

export const calculatePrevDT = (someDT: DateTime): DateTime => {
  return {
    ...someDT,
    prev_year: someDT.year - 1,
    curr_day: new Date().getDate(),
    curr_quarter: Math.floor(new Date().getMonth() / 3) + 1,
    days_of_year: getDaysPassed(someDT.year),
    last_year_date: getLastYearDate(someDT.year),
    last_date: getLastDate(someDT.year),
    ...getPrevQuarter(someDT.year, someDT.quarter),
    ...getPrevMonth(someDT.year, someDT.month),
    ...getMonthNames(someDT.month),
  };
};

export const getWeekNumber = (date: Date) => {
  const dateToCalc = date ? date : new Date();
  let onejan: Date = new Date(dateToCalc.getFullYear(), 0, 1);
  return Math.ceil(
    ((dateToCalc.getTime() - onejan.getTime()) / 86400000 +
      onejan.getDay() +
      1) /
      7
  );
};

const getFirstDayMonth = (val: number): Date => {
  const date = new Date();
  //NOTE: date.getMonth() returns 0-11 + 1 will end up with 1-12 months and val to shift
  return new Date(date.getFullYear(), date.getMonth() + val + 1);
};

const getWeekDate = (val: number) => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7 * val);
};

const getDay = (val: number): Date => {
  var dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + val);
  return dateObj;
};

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

export const getDefaultDT = (): DateTime => {
  var today = new Date();
  return {
    year: today.getFullYear(),
    quarter: 0,
    month: 0,
    week: 0,
    day: 0,
    hour: 0,
    curr_quarter: Math.floor(new Date().getMonth() / 3) + 1,
    day_date: "",
    month_name_ar: "",
    month_name_en: "",
    prev_month: 0,
    prev_month_year: 0,
    prev_quarter_year: 0,
    prev_quarter: 0,
    prev_year: today.getFullYear() - 1,
    curr_day: new Date().getDate(),
    days_of_year: getDaysPassed(today.getFullYear()),
    last_year_date: getLastYearDate(today.getFullYear()),
    last_date: getLastDate(today.getFullYear()),
  };
};

export const PredefinedDT = {
  getPrevYear: (): DateTime => {
    const dt = getDefaultDT();
    return {
      ...dt,
      year: dt.year - 1,
    };
  },

  getPrevQuarter: (): DateTime => {
    const current_quarter: DateTime = {
      ...getTimeToDate(new Date()),
      month: 0,
      week: 0,
      day: 0,
    };
    if (current_quarter.quarter === 1) {
      return {
        ...current_quarter,
        year: current_quarter.year - 1,
        quarter: 4,
      };
    } else {
      return {
        ...current_quarter,
        quarter: current_quarter.quarter - 1,
      };
    }
  },

  getPrevMonth: (): DateTime => {
    return { ...getTimeToDate(getFirstDayMonth(-1)), week: 0, day: 0 };
  },

  getPrevWeek: (): DateTime => {
    return { ...getTimeToDate(getWeekDate(-1)), day: 0 };
  },

  getPrevDay: (): DateTime => {
    return getTimeToDate(getDay(-1));
  },

  getCurrentYear: (): DateTime => {
    return getDefaultDT();
  },

  getCurrentQuarter: (): DateTime => {
    return { ...getTimeToDate(new Date()), month: 0, week: 0, day: 0 };
  },

  getCurrentMonth: (): DateTime => {
    return { ...getTimeToDate(getFirstDayMonth(0)), week: 0, day: 0 };
  },

  getCurrentWeek: (): DateTime => {
    return { ...getTimeToDate(new Date()), day: 0 };
  },

  getCurrentDay: (): DateTime => {
    return getTimeToDate(new Date());
  },
  getPrevTwoDay: (): DateTime => {
    return getTimeToDate(getDay(-2));
  },
};
