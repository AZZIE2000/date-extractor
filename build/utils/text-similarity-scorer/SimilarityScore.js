"use strict";
var natural = require("natural");
var dlev = require("damerau-levenshtein");
var winklerMetaphone = function (a, b, options) {
    var scoreJw = natural.JaroWinklerDistance(a, b);
    var scoreSoundex = 0;
    if (natural.Metaphone.compare(a, b)) {
        scoreSoundex = 1;
    }
    var score = 0.5 * (scoreJw + scoreSoundex);
    if (score < options.threshold)
        score = 0.0;
    return score;
};
var metaphoneDl = function (a, b, options) {
    var scoreDl = dlev(a, b).similarity;
    var scoreSoundex = 0;
    if (natural.Metaphone.compare(a, b)) {
        scoreSoundex = 1;
    }
    //let score = 0.5 * (scoreDl + scoreSoundex);
    var score = 0.5 * (scoreDl + scoreSoundex);
    if (score < options.threshold)
        score = 0.0;
    return score;
};
var dl = function (a, b, options) {
    var score = dlev(a, b).similarity;
    if (score < options.threshold)
        score = 0.0;
    return score;
};
var commonScore = { f: metaphoneDl, options: { threshold: 0.3 } };
//let commonScore = { f: winklerMetaphone, options : {threshold: 0.4} }
module.exports = { winklerMetaphone: winklerMetaphone, metaphoneDl: metaphoneDl, dl: dl, commonScore: commonScore };
