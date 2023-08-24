'use strict';
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
var Helper = require('./Helper');
var debug = require('debug')('SentenceSimilarity');
var deepcopy = require('clone');
/**
 * Order similarity should only depend on the number of matches, since
 * unmatched terms are already factored into the match similarity.
 */
var orderSimilarity = function (v, otherLength) {
    //compute the offset since the whole phrase might
    //actually be offset by a few words, but be in the
    //correct order.
    var offset = 0;
    var osCount = 0;
    v.forEach(function (c, i) {
        if (c >= 0) {
            osCount++;
            offset += c - i;
        }
    });
    offset = offset / osCount;
    var mL = Math.max(v.length, otherLength);
    var orderSimilarity = 0;
    v.forEach(function (c, i) {
        if (c >= 0) {
            orderSimilarity += 1.0 - Math.abs(c - i - offset) / mL;
        }
    });
    if (osCount == 0)
        return 0.0;
    return (orderSimilarity / osCount - 0.5) / 0.5;
};
/**
 * Create a table and return both the table and the
 * best similarity match for each term.  Averages the metaphone
 * and levenshtein-damaru scores to produce the final result.
 *
 * @param a is the word vector used as the row of the table
 * a should be the wild word vector of say ["wer","r","the","pigs"]
 * @param b is the word vector used as the columns of the table
 * b should be the controlled word vector (the one that is 'correct')
 * ["where","are","the"]
 */
var similarityTable = function (a, b, options) {
    var table = [];
    var best = [];
    for (var i = 0; i < b.length; i++) {
        table.push([]);
        if (!b[i].match(Helper.betweenParentheses)) {
            for (var j = 0; j < a.length; j++) {
                var score = options.f(a[j], b[i], options.options);
                table[i].push(score);
            }
        }
        else {
            for (var j = 0; j < a.length; j++) {
                table[i].push(0);
            }
        }
    }
    debug(table);
    return table;
};
var bestMatch = function (table) {
    var matchedColumn = new Map();
    var matchedRow = new Map();
    var unMatchedColumn = new Set();
    var unMatchedRow = new Set();
    for (var i = 0; i < table.length; i++) {
        unMatchedColumn.add(i);
    }
    for (var i = 0; i < table[0].length; i++) {
        unMatchedRow.add(i);
    }
    var shrunk = true;
    while (shrunk && unMatchedRow.size && unMatchedColumn.size) {
        shrunk = false;
        for (var _i = 0, unMatchedRow_1 = unMatchedRow; _i < unMatchedRow_1.length; _i++) {
            var i = unMatchedRow_1[_i];
            if (unMatchedColumn.size == 0) {
                matchedRow.set(i, { column: -1, score: 0 });
                continue;
            }
            //find the max in the columns
            var columnMax = -1;
            var columnScoreMax = 0;
            for (var _a = 0, unMatchedColumn_1 = unMatchedColumn; _a < unMatchedColumn_1.length; _a++) {
                var j = unMatchedColumn_1[_a];
                var val = table[j][i];
                if (val > columnScoreMax) {
                    columnScoreMax = val;
                    columnMax = j;
                }
            }
            //for that column find the maximum row
            var rowMax = -1;
            var rowScoreMax = 0;
            if (columnMax >= 0) {
                for (var _b = 0, unMatchedRow_2 = unMatchedRow; _b < unMatchedRow_2.length; _b++) {
                    var k = unMatchedRow_2[_b];
                    var val = table[columnMax][k];
                    if (val > rowScoreMax) {
                        rowScoreMax = val;
                        rowMax = k;
                    }
                }
            }
            if (rowMax == i && rowMax >= 0) {
                //rowScoreMax and columnScoreMax should be identical.
                matchedRow.set(rowMax, { column: columnMax, score: rowScoreMax });
                matchedColumn.set(columnMax, { row: rowMax, score: rowScoreMax });
                shrunk = true;
                if (rowMax >= 0)
                    unMatchedRow.delete(rowMax);
                if (columnMax >= 0)
                    unMatchedColumn.delete(columnMax);
            }
        }
    }
    return { matchedRow: matchedRow, matchedColumn: matchedColumn };
};
//Number of scores that were exact matches
var exactScore = function (bm, a, b) {
    var score = 0;
    for (var _i = 0, _a = bm.values(); _i < _a.length; _i++) {
        var i = _a[_i];
        if (i.score == 1) {
            score = score + 1;
        }
    }
    debug('bm', bm);
    return score;
};
//Total score including partial matches
var matchScore = function (bm, a, b) {
    var score = 0;
    for (var _i = 0, _a = bm.values(); _i < _a.length; _i++) {
        var i = _a[_i];
        score = score + i.score;
    }
    debug('bm', bm);
    return score;
};
var lengthScore = function (a, b) {
    var pCount = 0;
    b.forEach(function (val) {
        if (val.match(Helper.betweenParentheses)) {
            pCount++;
        }
    });
    return 1.0 / (b.length - pCount);
};
var computeVectors = function (bm, a, b) {
    var matchVector = [];
    var matchScore = [];
    for (var i = 0; i < a.length; i++) {
        var ans = bm.get(i);
        if (ans) {
            matchVector.push(ans.column);
            matchScore.push(ans.score);
        }
        else {
            matchVector.push(-1);
            matchScore.push(0);
        }
    }
    return {
        matched: matchVector,
        matchScore: matchScore,
        score: 0,
        score_pct: 0,
        literal: 0,
        order: 0,
        size: 0,
    };
};
/**
 * Computes the similarity between 2 sentence vectors a and b.
 * a and b are expected to be pre-processed before reaching this
 * state.
 *
 * @param a is the word vector whos similarity we are testing
 * @param b is the word vector we are comparing a to
 * @param threshold is the value below which the similarity is set to 0
 *
 * @return an object {matched : [], matchScore : [], score : }
 * where matched is a vector containing indexes of the matched
 * words in b.  matchScore is a vector of the score for each
 * match (0 is no match, 1 is perfect match).
 */
var similarity = function (ain, bin, options) {
    //NOTE You need to do this so that cleanArray does affect the final output
    //i.e. you don't want lowercase and missing commas etc in the final
    //result, only in the comparison.
    var a = deepcopy(ain, false);
    var b = deepcopy(bin, false);
    //Get rid of punctuation and capitalization for the comparison phase.
    a = Helper.cleanArray(a);
    b = Helper.cleanArray(b);
    debug('a', a);
    debug('b', b);
    var lteral_a = [a.join('')];
    var lteral_b = [b.join('')];
    var table = similarityTable(a, b, options);
    var bm = bestMatch(table);
    var exact = exactScore(bm.matchedRow, a, b);
    var score = matchScore(bm.matchedRow, a, b);
    //NOTE Literal best match
    var l_table = similarityTable(lteral_a, lteral_b, options);
    var lbm = bestMatch(l_table);
    var literal = matchScore(lbm.matchedRow, lteral_a, lteral_b);
    var vectors = computeVectors(bm.matchedRow, a, b);
    vectors.exact = exact;
    vectors.literal = approximate(literal);
    vectors.score = approximate(score);
    vectors.score_pct = approximate(vectors.score / ain.length);
    vectors.order = orderSimilarity(vectors.matched, b.length);
    vectors.size = lengthScore(a, b);
    return __assign({}, vectors);
};
var approximate = function (value) { return Math.floor(value * 100) / 100; };
module.exports = similarity;
