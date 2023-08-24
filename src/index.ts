import constants from "./constants";
import Desclude from "./data/Desclude";
import { TokenizedQT } from "./interface/search.interface";
import { getDateTimeTags } from "./utils/search.datetime.utils";

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
const dara: number = 0;
const question = "مبيعات كيري 2020";
const searchQuestion = descludeNotNeeded(toEnglishTokenize(question));
const datetimeQuestionResult = getDateTimeTags(searchQuestion);

console.log(datetimeQuestionResult);