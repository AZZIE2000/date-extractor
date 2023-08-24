import constants from "./constants";
import Desclude from "./data/Desclude";
import { TokenizedQT } from "./interface/search.interface";
import { getDateTimeTags } from "./utils/search.datetime.utils";
declare const descludeNotNeeded: (tqt: TokenizedQT) => TokenizedQT;
declare const toEnglishTokenize: (str: string) => TokenizedQT;
declare const extractDate: (text: string) => import("./interface/search.interface").DateTimeSearchResult;
export { constants, Desclude, TokenizedQT, getDateTimeTags, toEnglishTokenize, descludeNotNeeded, extractDate };
