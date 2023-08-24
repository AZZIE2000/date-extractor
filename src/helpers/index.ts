import constants from "../constants";
import Desclude from "../data/Desclude";
import { TokenizedQT } from "../interface/search.interface";

const pipe =
  (...fns) =>
  (x) => {
    const pipeFn = async (v, f) => {
      return f(await v);
    };
    return fns.reduce(pipeFn, Promise.resolve(x));
  };
const descludeNotNeeded = (tqt: TokenizedQT): TokenizedQT =>
  tqt.filter((a) => Desclude.indexOf(a) === -1);
const toEnglishTokenize = (str: string): TokenizedQT => {
  const persianNumbers: Array<string> = constants.PERSIAN_NUMBERS;
  const arabicNumbers: Array<string> = constants.ARABIC_NUMBERS;
  const englishNumbers: Array<string> = constants.ENGLISH_NUMBERS;
  return str
    .trim()
    .toLowerCase()
    .split("")
    .map(
      (c) =>
        englishNumbers[persianNumbers.indexOf(c)] ||
        englishNumbers[arabicNumbers.indexOf(c)] ||
        c
    )
    .join("")
    .replace(/[^a-zA-Z0-9,.${}_\u0621-\u064A ]/g, "")
    .split(" ");
};

/**
 *
 * @param text
 * @returns string[]
 * @description this function will remove all the not needed words from the text and return the array of words
 */
const preprocessText = (text: string): string[] => {
  return descludeNotNeeded(toEnglishTokenize(text));
};
export { pipe, preprocessText };
