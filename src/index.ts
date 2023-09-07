import axios from "axios";
import similarity from "similarity";
import constants from "./constants";
import { DateTime } from "./types";

class DateHelpers {
  protected date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  public getMonthName(lang: "en" | "ar", month: number) {
    return constants.monthNames[lang][month - 1];
  }

  public getYear(dateObj: Date = this.date): number {
    return dateObj.getFullYear();
  }

  public getMonth(dateObj: Date = this.date): number {
    return dateObj.getMonth() + 1;
  }

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
    const nowDate = new Date();
    const currentYear = dt.getFullYear();
    const current = dt.getTime();
    const previous = new Date(currentYear, 0, 1).getTime();
    if (nowDate.getFullYear() === dt.getFullYear()) {
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
    } else if (year > dt.getFullYear()) {
      return `${year}-1-1`;
    }
    return `${year}-12-31`;
  }
}
class ParserHelpers {
  public prepareText = (text: string): string =>
    text
      .normalize("NFKD")
      .replaceAll(/[\u064b-\u065f]/g, "")
      .replaceAll("ة", "ه");

  public textLanguage = (text: string): 1 | 2 => {
    if (constants.arabicRegex.test(text)) return 1;
    if (constants.englishRegex.test(text)) return 2;
    return 1;
  };

  public getUnit = (
    text: string
  ): "YEAR" | "MONTH" | "WEEK" | "DAY" | "HOUR" | null => {
    if (!text) return null;
    let foundUnit = null;
    let index = 0;

    const dataToFilter = Object.keys(constants.dateAlt);
    while (!foundUnit && index < dataToFilter.length) {
      const unit = dataToFilter[index].split("_");
      for (let i = 0; i < unit.length; i++) {
        const score = similarity(text, unit[i]);
        if (score > 0.85) {
          foundUnit = constants.dateAlt[dataToFilter[index]];
          break;
        }
      }
      index++;
    }
    return foundUnit;
  };

  public parseRelativeDateAR(text: string): {
    fullText: string;
    direction: string;
    number: string | null;
    unit: string;
  } | null {
    let match;
    while ((match = constants.relativeDateRegexAr.exec(text)) !== null) {
      match.fullText = match[0];
      match.direction = match[1];
      match.number = !match[2] ? 1 : match[2];
      match.unit = match[3];
      return match;
    }
    return null;
  }

  public parseRelativeDateEN(text: string): {
    fullText: string;
    direction: "before" | "after" | "in" | "ago";
    number: string;
    unit: string;
    ago: string;
  } | null {
    let match;
    while ((match = constants.relativeDateRegexEn.exec(text)) !== null) {
      match.fullText = match[0];
      match.direction = match[1] || match[4];
      match.number = match[2] || "1";
      match.unit = match[3];

      return match;
    }
    return null;
  }

  public async getWitAiResponse(text: string, isArabic: boolean) {
    const token = isArabic
      ? "XTTA326P36O52BV2WZVN345JHFV4265O"
      : "JBDXCFH25LDRPPBLX5JERPD2VLWMPEDH";
    return await axios
      .get(`https://api.wit.ai/message?q=${text}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res?.data?.entities["wit$datetime:datetime"];
        if (data) {
          return res?.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
  }

  public simplifyText(text: string) {
    let simplifiedText = text;
    for (const [search, replace] of constants.wordsToReplace) {
      simplifiedText = simplifiedText.replaceAll(search, replace);
    }
    return simplifiedText;
  }
}

/**
 * @class DateParser
 * @description This class is responsible for parsing the date from the user prompt
 * @param {string} prompt - The user prompt
 * @returns {DateTime} - The date object
 * @example
 * const dateParser = new DateParser("بعد 3 ايام");
 * const date = await dateParser.execute();
 * console.log(date);
 */
export default class DateParser {
  private userPrompt: string;
  private result = constants.emptyDateTime;
  private helpers = new ParserHelpers();
  private date: Date = new Date();
  private stopSearch: boolean = false;

  constructor(prompt: string) {
    this.userPrompt = prompt;
  }

  /**
   *
   * @param date
   * @returns build the date object
   */
  private build(date: Date = this.date): DateTime {
    const DTHelpers = new DateHelpers(date);
    return {
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

  private validateNewDate(date: Date) {
    const oldDateObj = this.result;
    const newDateObj = this.build(date);
    const changedValues = Object.keys(oldDateObj).filter(
      (key) => oldDateObj[key] !== newDateObj[key] && !key.includes("curr_")
    );
    changedValues.forEach((key) => {
      this.result[key] = newDateObj[key];
    });
    this.stopSearch = true;
    this.date = date;
  }
  private parseRelativeDateProcess(isArabic: boolean) {
    if (this.stopSearch) return;

    const object = isArabic
      ? this.helpers.parseRelativeDateAR(this.userPrompt)
      : this.helpers.parseRelativeDateEN(this.userPrompt);

    if (!object) return;

    const dir = isArabic
      ? object.direction === "بعد"
        ? "+"
        : "-"
      : object.direction === "before" || object.direction === "ago"
      ? "-"
      : "+";
    const dateUnit = this.helpers.getUnit(object.unit);

    if (!dateUnit) {
      return;
    }

    const theDate = this.date;
    const newDate = new Date(theDate);

    switch (dateUnit) {
      case "YEAR":
        newDate.setFullYear(
          newDate.getFullYear() + Number(`${dir}${object.number}`)
        );
        break;
      case "MONTH":
        newDate.setMonth(newDate.getMonth() + Number(`${dir}${object.number}`));
        break;
      case "WEEK":
        newDate.setDate(
          newDate.getDate() + Number(`${dir}${Number(object.number) * 7}`)
        );
        break;
      case "DAY":
        newDate.setDate(newDate.getDate() + Number(`${dir}${object.number}`));
        break;
    }

    if (this.date !== newDate) this.validateNewDate(newDate);
  }

  private async processPrompt() {
    const isArabic = this.helpers.textLanguage(this.userPrompt) === 1;

    this.parseRelativeDateProcess(isArabic);
    if (!this.stopSearch) {
      await this.helpers
        .getWitAiResponse(this.userPrompt, isArabic)
        .then((res) => {
          if (!res) return;
          const date = new Date(
            res?.entities["wit$datetime:datetime"][0].value
          );

          this.validateNewDate(date);
        });
    }
  }

  private preprocessText() {
    this.userPrompt = this.helpers.prepareText(this.userPrompt);
    const isArabic = this.helpers.textLanguage(this.userPrompt) === 1;
    if (isArabic) {
      this.userPrompt = this.helpers.simplifyText(this.userPrompt);
    }
  }
  // From here the public methods
  public async execute() {
    this.preprocessText();
    this.result = this.build();
    await this.processPrompt();
    return this.result;
  }
}
