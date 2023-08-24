"use strict";
var similarity = require('./Similarity');
var similarityScore = require('./SimilarityScore');
var abstractSim = function (s1, s2) {
    var winkOpts = {
        f: similarityScore.dl,
        options: { threshold: 0.5 },
    };
    return similarity(s1, s2, winkOpts);
};
module.exports = abstractSim;
