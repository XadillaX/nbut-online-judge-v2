/**
 * Created by XadillaX on 2015/3/29.
 */
var ProbList = {};
ProbList.name = "ProbList";
ProbList.needQuotes = true;

ProbList.restore = function(parsed) {
    return parsed.sort().join("|");
};

ProbList.parse = function(orig) {
    return orig.split("|").sort().compact(true).map(function(n) {
        return parseInt(n);
    });
};

ProbList.equal = function(a, b) {
    return ProbList.restore(a) === ProbList.restore(b);
};

ProbList.defaultValue = [];

module.exports = ProbList;
