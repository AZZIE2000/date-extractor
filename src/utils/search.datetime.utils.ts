// import deepcopy from "clone";
import constants from "../constants";
import dateTimeData from "../data/DateTime";
import monthsData from "../data/Month";
import monthsNerData from "../data/Month.NER";
import quartersData from "../data/Quarter";
import weeksNerData from "../data/Week.NER";
import errors from "../errors";
import {
  DateTime,
  DateTimeBool,
  DateTimeSearchResult,
  SimilarityResult,
  TokenizedQT,
} from "../interface/search.interface";
import {
  PredefinedDT,
  calculatePrevDT,
  generateEmptyDateTime,
  getDefaultDT,
  getTimeToDate,
} from "./datetime.utils";
// import similarity from "./text-similarity-scorer/";

const cloneObject = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj));
};

const similarity = require("./text-similarity-scorer");
const approximate = (value: number): number => Math.floor(value * 100) / 100;

const checkScore = (sim: SimilarityResult, shift: number): boolean => {
  if (constants.threshold + shift > 1) {
    throw new Error(errors.ADDING_SHIFT_ERROR);
  }
  const { score_pct } = sim;
  return score_pct > constants.threshold + shift;
};
const getQTIndex = (qt: TokenizedQT, value: string): number => {
  return qt.indexOf(value);
};

const shiftDTFunc = (dt_res: string): DateTime | undefined => {
  if (dt_res === constants.CURRENT_YEAR) {
    return PredefinedDT.getCurrentYear();
  } else if (dt_res === constants.PREVIOUS_YEAR) {
    return PredefinedDT.getPrevYear();
  } else if (dt_res === constants.CURRENT_QUARTER) {
    return PredefinedDT.getCurrentQuarter();
  } else if (dt_res === constants.PREVIOUS_QUARTER) {
    return PredefinedDT.getPrevQuarter();
  } else if (dt_res === constants.CURRENT_MONTH) {
    return PredefinedDT.getCurrentMonth();
  } else if (dt_res === constants.PREVIOUS_MONTH) {
    return PredefinedDT.getPrevMonth();
  } else if (dt_res === constants.CURRENT_WEEK) {
    return PredefinedDT.getCurrentWeek();
  } else if (dt_res === constants.PREVIOUS_WEEK) {
    return PredefinedDT.getPrevWeek();
  } else if (dt_res === constants.CURRENT_DAY) {
    return PredefinedDT.getCurrentDay();
  } else if (dt_res === constants.PREVIOUS_DAY) {
    return PredefinedDT.getPrevDay();
  } else if (dt_res === constants.PREVIOUS_TWO_DAY) {
    return PredefinedDT.getPrevTwoDay();
  }
};

const getNotMatchedQT = (
  qt: TokenizedQT,
  indexes: Array<number>
): TokenizedQT => qt.filter((a, i) => indexes.indexOf(i) === -1);

const getMatchedQT = (qt: any[], indexes: Array<number> | null): TokenizedQT =>
  indexes ? qt.filter((a, i) => indexes.indexOf(i) !== -1) : [];

const checkIfYear = (strValue: string, year: number) =>
  +strValue >= 1990 && +strValue <= year;

const getDatetimeBool = (dt: DateTime): DateTimeBool => {
  return {
    year: !!dt.year,
    month: !!dt.month,
    quarter: !!dt.quarter,
    week: !!dt.week,
    day: !!dt.day,
  };
};

const getDateTimeTags = (question: TokenizedQT): DateTimeSearchResult => {
  const dateTime: DateTime = generateEmptyDateTime();
  const indexes: any[] = [];
  const temp_indexes = [];
  const match_indexes = [];
  const now_dateTime = new Date();
  const currentTime = getDefaultDT(); //getTimeToDate(now_dateTime) //getYearToDate(now_dateTime);
  const qt: TokenizedQT = cloneObject(question);
  let quarters_stop_search = false;

  let stop_search = false; //NOTE some keywords need to let the search stop
  let temp_qt = getNotMatchedQT(qt, indexes);
  if (!qt.length) {
    return {
      question,
      dateTimeBool: getDatetimeBool(currentTime),
      dateTime: currentTime,
    };
  }

  //NOTE Find Year from Date
  getNotMatchedQT(qt, indexes).forEach((wrd, ind) => {
    if (checkIfYear(wrd, currentTime.year)) {
      indexes.push(ind);
      dateTime.year = +wrd;
    }
  });

  getNotMatchedQT(qt, indexes).forEach((wrd, ind) => {
    var monthIndex = monthsNerData.indexOf(wrd);
    var weekIndex = weeksNerData.indexOf(wrd);
    if (monthIndex !== -1 && !isNaN(+getNotMatchedQT(qt, indexes)[ind + 1])) {
      dateTime.month = +getNotMatchedQT(qt, indexes)[ind + 1];
      temp_indexes.push(ind as never);
      temp_indexes.push((ind + 1) as never);
    }
  });

  temp_qt = getNotMatchedQT(qt, indexes);

  dateTimeData.forEach((dt) => {
    if (getNotMatchedQT(qt, indexes).length) {
      var sim: SimilarityResult = similarity(
        dt.date_value.split(" "),
        getNotMatchedQT(qt, indexes)
      );
      if (checkScore(sim, 0.01)) {
        Object.assign(dateTime, shiftDTFunc(dt.result));
      }
    }
  });

  //NOTE IF QT is empty stop searching
  if (!getNotMatchedQT(qt, indexes).length || stop_search) {
    return {
      question: getNotMatchedQT(qt, indexes),
      dateTime: fixIncomingDate(dateTime, currentTime),
      dateTimeBool: getDatetimeBool(fixIncomingDate(dateTime, currentTime)),
    };
  }

  monthsData.forEach((mnth) => {
    if (getNotMatchedQT(qt, indexes).length) {
      var sim = similarity(
        mnth.month_name.split(" "),
        getNotMatchedQT(qt, indexes)
      );
      if (checkScore(sim, 0.01)) {
        sim.matchScore.map((a:number, i:number) => {
          if (a === 1) {
            const qtToRemove = mnth.month_name.split(" ")[i];
            indexes.push(getQTIndex(qt, qtToRemove));
            // indexes.push(indexOfMax(sim.matchScore));
            dateTime.month = mnth.month_value;
          }
        });
      }
    }
  });

  if (!getNotMatchedQT(qt, indexes).length) {
    return {
      question: getNotMatchedQT(qt, indexes),
      dateTime: fixIncomingDate(dateTime, currentTime),
      dateTimeBool: getDatetimeBool(fixIncomingDate(dateTime, currentTime)),
    };
  }

  temp_qt = getNotMatchedQT(qt, indexes);

  quartersData.forEach((qrtr) => {
    var sim = similarity(qrtr.quarter_name.split(" "), temp_qt);
    if (sim.score_pct === 1) {
      quarters_stop_search = true;
      temp_indexes.push();
      sim.matchScore.map((a:number, i:number) => {
        if (a === 1) {
          indexes.push(getQTIndex(qt, qrtr.quarter_name.split(" ")[i]));
        }
      });
      dateTime.quarter = qrtr.quarter_value;
    }
  });

  if (!getNotMatchedQT(qt, indexes).length) {
    return {
      question: getNotMatchedQT(qt, indexes),
      dateTime: fixIncomingDate(dateTime, currentTime),
      dateTimeBool: getDatetimeBool(fixIncomingDate(dateTime, currentTime)),
    };
  }

  if (Object.keys(dateTime).length) {
    return {
      question: getNotMatchedQT(qt, indexes),
      dateTime: fixIncomingDate(dateTime, currentTime),
      dateTimeBool: getDatetimeBool(fixIncomingDate(dateTime, currentTime)),
    };
  } else {
    return {
      question,
      dateTime: currentTime,
      dateTimeBool: getDatetimeBool(fixIncomingDate(dateTime, currentTime)),
    };
  }
};

const getMonthOfWeek = (w: number, y: number): number => {
  const d = 1 + (w - 1) * 7;
  const m = new Date(y, 0, d).getMonth();
  return m + 1;
};

const fixIncomingDate = (
  dateTime: DateTime,
  currentTime: DateTime
): DateTime => {
  let dt = cloneObject(dateTime);
  let ct = cloneObject(currentTime);
  if (!dt.year) {
    dt.year = ct.year;
  }
  if (dt.quarter && dt.month) {
  } else if (dt.quarter) {
    //NOTE quarter + year
  } else if (dt.month) {
    //NOTE year + quarter + month
    dt.quarter = Math.floor((dt.month - 1) / 3) + 1;
  } else if (!dt.quarter && !dt.month && dt.week) {
    //NOTE year + quarter + month + week
    dt.month = getMonthOfWeek(dt.week, dt.year);
    dt.quarter = Math.floor((dt.month - 1) / 3) + 1;
  }
  return calculatePrevDT(dt);
};

const getNMQ1Indexes = (matched: Array<number>): Array<any> =>
  matched.map((a, i) => (a === -1 ? null : i)).filter((a) => a !== null) || [];

const getNMQ2Indexes = (matched: Array<number> = []): Array<any> =>
  matched.map((a, i) => (a === -1 ? null : a)).filter((a) => a !== null) || [];

const getNMSourceIndexes = (
  matched: Array<number> = [],
  nmqt: TokenizedQT,
  qt: TokenizedQT
): Array<number> => {
  const qts: TokenizedQT = matched.map((m) => nmqt[m]);
  return qt
    .map((a, i) => (qts.find((b) => b === a) ? null : i))
    .filter((a) => a !== null) as Array<number>;
};

const getMSourceIndexes = (
  matched: Array<number> = [],
  mqt: TokenizedQT,
  qt: TokenizedQT
): Array<number> => {
  const qts: TokenizedQT = matched.map((m, i) => mqt[i]);
  return qt
    .map((a, i) => (qts.indexOf(a) !== -1 ? i : null))
    .filter((a) => a !== null) as Array<number>;
};

export {
  getDateTimeTags,
  getTimeToDate,
  getNotMatchedQT,
  getMatchedQT,
  getMSourceIndexes,
  getNMQ1Indexes,
  getNMQ2Indexes,
  getNMSourceIndexes,
};
