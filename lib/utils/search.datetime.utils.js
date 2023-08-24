"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNMSourceIndexes = exports.getNMQ2Indexes = exports.getNMQ1Indexes = exports.getMSourceIndexes = exports.getMatchedQT = exports.getNotMatchedQT = exports.getTimeToDate = exports.getDateTimeTags = void 0;
// import deepcopy from "clone";
var constants_1 = require("../constants");
var DateTime_1 = require("../data/DateTime");
var Month_1 = require("../data/Month");
var Month_NER_1 = require("../data/Month.NER");
var Quarter_1 = require("../data/Quarter");
var Week_NER_1 = require("../data/Week.NER");
var errors_1 = require("../errors");
var datetime_utils_1 = require("./datetime.utils");
Object.defineProperty(exports, "getTimeToDate", { enumerable: true, get: function () { return datetime_utils_1.getTimeToDate; } });
// import similarity from "./text-similarity-scorer/";
var cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
var similarity = require("./text-similarity-scorer");
var approximate = function (value) { return Math.floor(value * 100) / 100; };
var checkScore = function (sim, shift) {
    if (constants_1.default.threshold + shift > 1) {
        throw new Error(errors_1.default.ADDING_SHIFT_ERROR);
    }
    var score_pct = sim.score_pct;
    return score_pct > constants_1.default.threshold + shift;
};
var getQTIndex = function (qt, value) {
    return qt.indexOf(value);
};
var shiftDTFunc = function (dt_res) {
    if (dt_res === constants_1.default.CURRENT_YEAR) {
        return datetime_utils_1.PredefinedDT.getCurrentYear();
    }
    else if (dt_res === constants_1.default.PREVIOUS_YEAR) {
        return datetime_utils_1.PredefinedDT.getPrevYear();
    }
    else if (dt_res === constants_1.default.CURRENT_QUARTER) {
        return datetime_utils_1.PredefinedDT.getCurrentQuarter();
    }
    else if (dt_res === constants_1.default.PREVIOUS_QUARTER) {
        return datetime_utils_1.PredefinedDT.getPrevQuarter();
    }
    else if (dt_res === constants_1.default.CURRENT_MONTH) {
        return datetime_utils_1.PredefinedDT.getCurrentMonth();
    }
    else if (dt_res === constants_1.default.PREVIOUS_MONTH) {
        return datetime_utils_1.PredefinedDT.getPrevMonth();
    }
    else if (dt_res === constants_1.default.CURRENT_WEEK) {
        return datetime_utils_1.PredefinedDT.getCurrentWeek();
    }
    else if (dt_res === constants_1.default.PREVIOUS_WEEK) {
        return datetime_utils_1.PredefinedDT.getPrevWeek();
    }
    else if (dt_res === constants_1.default.CURRENT_DAY) {
        return datetime_utils_1.PredefinedDT.getCurrentDay();
    }
    else if (dt_res === constants_1.default.PREVIOUS_DAY) {
        return datetime_utils_1.PredefinedDT.getPrevDay();
    }
    else if (dt_res === constants_1.default.PREVIOUS_TWO_DAY) {
        return datetime_utils_1.PredefinedDT.getPrevTwoDay();
    }
};
var getNotMatchedQT = function (qt, indexes) { return qt.filter(function (a, i) { return indexes.indexOf(i) === -1; }); };
exports.getNotMatchedQT = getNotMatchedQT;
var getMatchedQT = function (qt, indexes) {
    return indexes ? qt.filter(function (a, i) { return indexes.indexOf(i) !== -1; }) : [];
};
exports.getMatchedQT = getMatchedQT;
var checkIfYear = function (strValue, year) {
    return +strValue >= 1990 && +strValue <= year;
};
var getDatetimeBool = function (dt) {
    return {
        year: !!dt.year,
        month: !!dt.month,
        quarter: !!dt.quarter,
        week: !!dt.week,
        day: !!dt.day,
    };
};
var getDateTimeTags = function (question) {
    var dateTime = (0, datetime_utils_1.generateEmptyDateTime)();
    var indexes = [];
    var temp_indexes = [];
    var match_indexes = [];
    var now_dateTime = new Date();
    var currentTime = (0, datetime_utils_1.getDefaultDT)(); //getTimeToDate(now_dateTime) //getYearToDate(now_dateTime);
    var qt = cloneObject(question);
    var quarters_stop_search = false;
    var stop_search = false; //NOTE some keywords need to let the search stop
    var temp_qt = getNotMatchedQT(qt, indexes);
    if (!qt.length) {
        return {
            question: question,
            dateTimeBool: getDatetimeBool(currentTime),
            dateTime: currentTime,
        };
    }
    //NOTE Find Year from Date
    getNotMatchedQT(qt, indexes).forEach(function (wrd, ind) {
        if (checkIfYear(wrd, currentTime.year)) {
            indexes.push(ind);
            dateTime.year = +wrd;
        }
    });
    getNotMatchedQT(qt, indexes).forEach(function (wrd, ind) {
        var monthIndex = Month_NER_1.default.indexOf(wrd);
        var weekIndex = Week_NER_1.default.indexOf(wrd);
        if (monthIndex !== -1 && !isNaN(+getNotMatchedQT(qt, indexes)[ind + 1])) {
            dateTime.month = +getNotMatchedQT(qt, indexes)[ind + 1];
            temp_indexes.push(ind);
            temp_indexes.push((ind + 1));
        }
    });
    temp_qt = getNotMatchedQT(qt, indexes);
    DateTime_1.default.forEach(function (dt) {
        if (getNotMatchedQT(qt, indexes).length) {
            var sim = similarity(dt.date_value.split(" "), getNotMatchedQT(qt, indexes));
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
    Month_1.default.forEach(function (mnth) {
        if (getNotMatchedQT(qt, indexes).length) {
            var sim = similarity(mnth.month_name.split(" "), getNotMatchedQT(qt, indexes));
            if (checkScore(sim, 0.01)) {
                sim.matchScore.map(function (a, i) {
                    if (a === 1) {
                        var qtToRemove = mnth.month_name.split(" ")[i];
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
    Quarter_1.default.forEach(function (qrtr) {
        var sim = similarity(qrtr.quarter_name.split(" "), temp_qt);
        if (sim.score_pct === 1) {
            quarters_stop_search = true;
            temp_indexes.push();
            sim.matchScore.map(function (a, i) {
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
    }
    else {
        return {
            question: question,
            dateTime: currentTime,
            dateTimeBool: getDatetimeBool(fixIncomingDate(dateTime, currentTime)),
        };
    }
};
exports.getDateTimeTags = getDateTimeTags;
var getMonthOfWeek = function (w, y) {
    var d = 1 + (w - 1) * 7;
    var m = new Date(y, 0, d).getMonth();
    return m + 1;
};
var fixIncomingDate = function (dateTime, currentTime) {
    var dt = cloneObject(dateTime);
    var ct = cloneObject(currentTime);
    if (!dt.year) {
        dt.year = ct.year;
    }
    if (dt.quarter && dt.month) {
    }
    else if (dt.quarter) {
        //NOTE quarter + year
    }
    else if (dt.month) {
        //NOTE year + quarter + month
        dt.quarter = Math.floor((dt.month - 1) / 3) + 1;
    }
    else if (!dt.quarter && !dt.month && dt.week) {
        //NOTE year + quarter + month + week
        dt.month = getMonthOfWeek(dt.week, dt.year);
        dt.quarter = Math.floor((dt.month - 1) / 3) + 1;
    }
    return (0, datetime_utils_1.calculatePrevDT)(dt);
};
var getNMQ1Indexes = function (matched) {
    return matched.map(function (a, i) { return (a === -1 ? null : i); }).filter(function (a) { return a !== null; }) || [];
};
exports.getNMQ1Indexes = getNMQ1Indexes;
var getNMQ2Indexes = function (matched) {
    if (matched === void 0) { matched = []; }
    return matched.map(function (a, i) { return (a === -1 ? null : a); }).filter(function (a) { return a !== null; }) || [];
};
exports.getNMQ2Indexes = getNMQ2Indexes;
var getNMSourceIndexes = function (matched, nmqt, qt) {
    if (matched === void 0) { matched = []; }
    var qts = matched.map(function (m) { return nmqt[m]; });
    return qt
        .map(function (a, i) { return (qts.find(function (b) { return b === a; }) ? null : i); })
        .filter(function (a) { return a !== null; });
};
exports.getNMSourceIndexes = getNMSourceIndexes;
var getMSourceIndexes = function (matched, mqt, qt) {
    if (matched === void 0) { matched = []; }
    var qts = matched.map(function (m, i) { return mqt[i]; });
    return qt
        .map(function (a, i) { return (qts.indexOf(a) !== -1 ? i : null); })
        .filter(function (a) { return a !== null; });
};
exports.getMSourceIndexes = getMSourceIndexes;
