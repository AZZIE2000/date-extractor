"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var Desclude_1 = require("./data/Desclude");
var search_datetime_utils_1 = require("./utils/search.datetime.utils");
var descludeNotNeeded = function (tqt) {
    return tqt.filter(function (a) { return Desclude_1.default.indexOf(a) === -1; });
};
var toEnglishTokenize = function (str) {
    var persianNumbers = constants_1.default.PERSIAN_NUMBERS;
    var arabicNumbers = constants_1.default.ARABIC_NUMBERS;
    var englishNumbers = constants_1.default.ENGLISH_NUMBERS;
    return str
        .trim()
        .toLowerCase()
        .split("")
        .map(function (c) {
        return englishNumbers[persianNumbers.indexOf(c)] ||
            englishNumbers[arabicNumbers.indexOf(c)] ||
            c;
    })
        .join("")
        .replace(/[^a-zA-Z0-9,.${}_\u0621-\u064A ]/g, "")
        .split(" ");
};
var dara = 0;
var question = "مبيعات كيري الشهر الحالي";
var searchQuestion = descludeNotNeeded(toEnglishTokenize(question));
var datetimeQuestionResult = (0, search_datetime_utils_1.getDateTimeTags)(searchQuestion);
console.log(datetimeQuestionResult);
