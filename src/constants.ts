const constants = {
  wordsToReplace: [
    ["يومين", "2 يوم"],
    ["شهرين", "2 شهر"],
    ["اسبوعين", "2 اسبوع"],
    ["سنتين", "2 سنه"],
    ["مبارح", "قبل يوم"],
    ["امبارح", "قبل يوم"],
    ["السنه الماضيه", "قبل سنه"],
    ["السنه السابقه", "قبل سنه"],
    ["العام الماضي", "قبل سنه"],
    ["العام السابق", "قبل سنه"],
    ["الشهر الماضي", "قبل شهر"],
    ["الشهر السابق", "قبل شهر"],
    ["الشهر الفائت", "قبل شهر"],
    ["الشهر الي فات", "قبل شهر"],
    ["الشهر الي مضى", "قبل شهر"],
    ["الاسبوع الماضي", "قبل اسبوع"],
    ["الاسبوع السابق", "قبل اسبوع"],
    ["الاسبوع الفائت", "قبل اسبوع"],
    ["الاسبوع الي فات", "قبل اسبوع"],
    ["الاسبوع الي مضى", "قبل اسبوع"],
    ["اليوم الماضي", "قبل يوم"],
    ["اليوم السابق", "قبل يوم"],
    ["قبل يومين", "قبل 2 يوم"],
    ["اول مبارح", "قبل 2 يوم"],
    ["اول امبارح", "قبل 2 يوم"],
  ],
  dateAlt: {
    سنة_سنه_سنين_سنوات_year_years: "YEAR",
    شهر_شهور_اشهر_اشهر_month_months: "MONTH",
    اسبوع_اسابيع_اسابيع_week_weeks: "WEEK",
    يوم_ايام_day_days: "DAY",
  },
  relativeDateRegexEn:
    // |hour(?:s)? | maybe later
    /(before|after|in)? ?(\d+) ?(day(?:s)?|week(?:s)?|month(?:s)?|year(?:s)?) ?(ago)?/gm,
  relativeDateRegexAr:
    /(قبل|بعد) ?(\d+)? (ايام|اسابيع|(?:ا|أ)?شهر|(?:ا|أ)سبوع|يوم|سنين|سنوات|سنه)/gm,
  emptyDateTime: {
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
  },
  monthNames: {
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
  },
  arabicRegex: /[\u0600-\u06FF\u0750-\u077F]/,
  englishRegex: /[a-zA-Z]/,
};

export default constants;
