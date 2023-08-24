"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredefinedDT = exports.getDefaultDT = exports.generateEmptyDateTime = exports.getWeekNumber = exports.calculatePrevDT = exports.getTimeToDate = void 0;
var Month_1 = require("../data/Month");
var getDaysPassed = function (year) {
    var dt = new Date();
    if (year === dt.getFullYear()) {
        var current = new Date(dt.getTime()).getTime();
        var previous = new Date(dt.getFullYear(), 0, 1).getTime();
        return Math.ceil((current - previous + 1) / 86400000);
    }
    return 365;
};
var getLastYearDate = function (year) {
    var dt = new Date();
    if (year === dt.getFullYear()) {
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        return "".concat(year, "-").concat(month > 9 ? month : "0" + month, "-").concat(day > 9 ? day : "0" + day);
    }
    return "".concat(year, "-12-31");
};
var getLastDate = function (year) {
    var dt = new Date();
    if (year === dt.getFullYear()) {
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        return "".concat(month > 9 ? month : "0" + month, "-").concat(day > 9 ? day : "0" + day);
    }
    return "12-31";
};
var getYear = function (date) {
    return date ? date.getFullYear() : new Date().getFullYear();
};
var getPrevQuarter = function (year, quarter) {
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
var getMonthNames = function (month) {
    if (!month || !Month_1.default) {
        return { month_name_ar: "", month_name_en: "" };
    }
    return {
        month_name_ar: Month_1.default.find(function (a) { return a.month_value === month && a.lang === 1; })
            .month_name,
        month_name_en: Month_1.default.find(function (a) { return a.month_value === month && a.lang === 2; })
            .month_name,
    };
};
var getPrevMonth = function (year, month) {
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
var getTimeToDate = function (someDate) {
    var today = someDate ? new Date(someDate) : new Date();
    var quarter = Math.floor(today.getMonth() / 3) + 1;
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    return __assign(__assign({ year: year, prev_year: year - 1, quarter: quarter, month: month, week: (0, exports.getWeekNumber)(today), last_year_date: getLastYearDate(year), last_date: getLastDate(year), day: today.getDate(), day_date: "".concat(today.getDate(), "/").concat(month > 9 ? month : "" + month, "/").concat(year), curr_day: today.getDate(), days_of_year: getDaysPassed(year), hour: today.getHours(), curr_quarter: Math.floor(new Date().getMonth() / 3) + 1, month_name_ar: Month_1.default.find(function (a) { return a.month_value === month && a.lang === 1; })
            .month_name, month_name_en: Month_1.default.find(function (a) { return a.month_value === month && a.lang === 2; })
            .month_name }, getPrevQuarter(year, quarter)), getPrevMonth(year, month));
};
exports.getTimeToDate = getTimeToDate;
var calculatePrevDT = function (someDT) {
    return __assign(__assign(__assign(__assign(__assign({}, someDT), { prev_year: someDT.year - 1, curr_day: new Date().getDate(), curr_quarter: Math.floor(new Date().getMonth() / 3) + 1, days_of_year: getDaysPassed(someDT.year), last_year_date: getLastYearDate(someDT.year), last_date: getLastDate(someDT.year) }), getPrevQuarter(someDT.year, someDT.quarter)), getPrevMonth(someDT.year, someDT.month)), getMonthNames(someDT.month));
};
exports.calculatePrevDT = calculatePrevDT;
var getWeekNumber = function (date) {
    var dateToCalc = date ? date : new Date();
    var onejan = new Date(dateToCalc.getFullYear(), 0, 1);
    return Math.ceil(((dateToCalc.getTime() - onejan.getTime()) / 86400000 +
        onejan.getDay() +
        1) /
        7);
};
exports.getWeekNumber = getWeekNumber;
var getFirstDayMonth = function (val) {
    var date = new Date();
    //NOTE: date.getMonth() returns 0-11 + 1 will end up with 1-12 months and val to shift
    return new Date(date.getFullYear(), date.getMonth() + val + 1);
};
var getWeekDate = function (val) {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7 * val);
};
var getDay = function (val) {
    var dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + val);
    return dateObj;
};
var generateEmptyDateTime = function () {
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
exports.generateEmptyDateTime = generateEmptyDateTime;
var getDefaultDT = function () {
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
exports.getDefaultDT = getDefaultDT;
exports.PredefinedDT = {
    getPrevYear: function () {
        var dt = (0, exports.getDefaultDT)();
        return __assign(__assign({}, dt), { year: dt.year - 1 });
    },
    getPrevQuarter: function () {
        var current_quarter = __assign(__assign({}, (0, exports.getTimeToDate)(new Date())), { month: 0, week: 0, day: 0 });
        if (current_quarter.quarter === 1) {
            return __assign(__assign({}, current_quarter), { year: current_quarter.year - 1, quarter: 4 });
        }
        else {
            return __assign(__assign({}, current_quarter), { quarter: current_quarter.quarter - 1 });
        }
    },
    getPrevMonth: function () {
        return __assign(__assign({}, (0, exports.getTimeToDate)(getFirstDayMonth(-1))), { week: 0, day: 0 });
    },
    getPrevWeek: function () {
        return __assign(__assign({}, (0, exports.getTimeToDate)(getWeekDate(-1))), { day: 0 });
    },
    getPrevDay: function () {
        return (0, exports.getTimeToDate)(getDay(-1));
    },
    getCurrentYear: function () {
        return (0, exports.getDefaultDT)();
    },
    getCurrentQuarter: function () {
        return __assign(__assign({}, (0, exports.getTimeToDate)(new Date())), { month: 0, week: 0, day: 0 });
    },
    getCurrentMonth: function () {
        return __assign(__assign({}, (0, exports.getTimeToDate)(getFirstDayMonth(0))), { week: 0, day: 0 });
    },
    getCurrentWeek: function () {
        return __assign(__assign({}, (0, exports.getTimeToDate)(new Date())), { day: 0 });
    },
    getCurrentDay: function () {
        return (0, exports.getTimeToDate)(new Date());
    },
    getPrevTwoDay: function () {
        return (0, exports.getTimeToDate)(getDay(-2));
    },
};
