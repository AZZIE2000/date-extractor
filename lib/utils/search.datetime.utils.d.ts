import { DateTimeSearchResult, TokenizedQT } from "../interface/search.interface";
import { getTimeToDate } from "./datetime.utils";
declare const getNotMatchedQT: (qt: TokenizedQT, indexes: Array<number>) => TokenizedQT;
declare const getMatchedQT: (qt: any[], indexes: Array<number> | null) => TokenizedQT;
declare const getDateTimeTags: (question: TokenizedQT) => DateTimeSearchResult;
declare const getNMQ1Indexes: (matched: Array<number>) => Array<any>;
declare const getNMQ2Indexes: (matched?: Array<number>) => Array<any>;
declare const getNMSourceIndexes: (matched: number[] | undefined, nmqt: TokenizedQT, qt: TokenizedQT) => Array<number>;
declare const getMSourceIndexes: (matched: number[] | undefined, mqt: TokenizedQT, qt: TokenizedQT) => Array<number>;
export { getDateTimeTags, getTimeToDate, getNotMatchedQT, getMatchedQT, getMSourceIndexes, getNMQ1Indexes, getNMQ2Indexes, getNMSourceIndexes, };
