/**
 * Created by XadillaX on 2015/4/6.
 */
var Toshihiko = require("toshihiko");
var async = require("async");
var pangu = require("pangunode");

var helper = require("../lib/helper");

var ContestProblemModel = global.toshihiko.define("oj_contestproblem", [
    { name: "cpId", column: "contestproblemid", primaryKey: true, type: Toshihiko.Type.Integer },
    { name: "contestId", column: "contestid", type: Toshihiko.Type.Integer },
    { name: "problemId", column: "problemid", type: Toshihiko.Type.Integer },
    { name: "index", type: Toshihiko.Type.String },
    { name: "submittedCount", column: "submit", type: Toshihiko.Type.Integer },
    { name: "solvedCount", column: "solved", type: Toshihiko.Type.Integer }
]);

/**
 * 获取一个题目前面还有几个题目
 * @param contestId
 * @param index
 * @param callback
 */
ContestProblemModel.getAProblemsPosition = function(contestId, index, callback) {
    this.where({
        contestId: contestId,
        index: { $lt: index }
    }).count(callback);
};

/**
 * 根据比赛编号、索引号获取题目详情
 * @param contestId
 * @param index
 * @param callback
 */
ContestProblemModel.getProblemInformation = function(contestId, index, callback) {
    this.where({ contestId: contestId, index: index }).findOne(function(err, problem) {
        if(err) return callback(err);
        if(!problem) return callback();

        var Problem = helper.common.getModel("problem");
        Problem.where({ problemId: problem.problemId }).findOne(function(err, detail) {
            if(err) return callback(err);
            if(!detail) return callback();

            problem = problem.toJSON();
            detail = detail.toJSON();
            detail.title = pangu(detail.title);

            return callback(undefined, Object.merge(problem, detail));
        });
    });
};

/**
 * 获取题目页数
 * @param contestId
 * @param perPage
 * @param callback
 */
ContestProblemModel.getTotalPage = function(contestId, perPage, callback) {
    this.where({ contestId: contestId }).count(function(err, count) {
        if(err) return callback(err);
        var pages = parseInt(count / perPage);
        if(count % perPage) pages++;
        if(pages === 0) pages = 1;
        callback(undefined, pages);
    });
};

/**
 * 根据分页信息来获取题目列表
 * @param contestId
 * @param page
 * @param perPage
 * @param callback
 */
ContestProblemModel.getProblemListByPage = function(contestId, page, perPage, callback) {
    this.where({
        contestId: contestId
    }).limit([ (page - 1) * perPage, perPage ]).orderBy({ index: 1 }).find(function(err, problems) {
        if(err) return callback(err);

        var Problem = helper.common.getModel("problem");
        async.mapLimit(problems, 10, function(problem, callback) {
            Problem.field([ "title" ]).where({ problemId: problem.problemId }).findOne(function(err, desc) {
                if(err) return callback(err);
                problem.title = pangu(desc.title).trim();
                problem.rate = problem.solvedCount / problem.submittedCount;
                callback(undefined, problem);
            });
        }, function(err, problems) {
            callback(err, problems);
        });
    }, true);
};

module.exports = ContestProblemModel;
