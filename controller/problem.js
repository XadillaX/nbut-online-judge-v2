/**
 * Created by XadillaX on 13-12-21.
 */
var ContestProblemModel = require("../model/contestProblemModel");
var functions = require("../util/functions");
var helper = require("../helper");
var async = require("async");

/**
 * check feeding code.
 * @param req
 * @param resp
 */
exports.feedCodeMiao = function(req, resp) {
    resp.send(200, req.body);
};

/**
 * feed code.
 * @param req
 * @param resp
 */
exports.feedCode = function(req, resp) {
    var index = req.params.index;

    resp.renderData.title = "喂食代码 - " + resp.renderData.title;
    resp.renderData.pageType = "feedcode";

    if(undefined === index) {
        index = "";

        resp.renderData.index = index;
        resp.renderData.nav.push({ name: "Feed Code", url: "/feedcode" });
        resp.render("problem/feedcode", resp.renderData);
    } else {
        var contestProblemModel = helper.common.model("contestProblem");
        contestProblemModel.getPracticeProblemInfo(index, function(err, problem) {
            problem.title = problem.title.replaceAll("\"", "\\\"");
            if(err) {
                return resp.redirect("/feedcode");
            }

            resp.renderData.index = index;
            resp.renderData.nav.push({ "name": "Problem List", "url": "/problem/list/" });
            resp.renderData.nav.push({ "name": "Page " + parseInt(((index - 1000) / 100) + 1), "url": "/problem/list/" + parseInt(((index - 1000) / 100) + 1) });
            resp.renderData.nav.push({ "name": problem.title, "url": "/problem/" + index });
            resp.renderData.nav.push({ "name": "Feed Code", "url": "/feedcode/" + index });
            resp.renderData.title = "[P" + index + "] " + problem.title + " - " + resp.renderData.title;
            resp.renderData.pageType = "problemlist";
            resp.renderData.problem = problem;

            resp.render("problem/feedcode", resp.renderData);
        });
    }
};

/**
 * 题目详情
 * @param req
 * @param resp
 * @returns {*}
 */
exports.info = function(req, resp) {
    var contestProblemModel = helper.common.model("contestProblem");

    var index = req.params.index;
    if(undefined === index) {
        return resp.redirect("/problem/list");
    }

    contestProblemModel.getPracticeProblemInfo(index, function(err, problem) {
        if(err) {
            return resp.redirect("/problem/list");
        }

        resp.renderData.nav.push({ "name": "Problem List", "url": "/problem/list/" });
        resp.renderData.nav.push({ "name": "Page " + parseInt(((index - 1000) / 100) + 1), "url": "/problem/list/" + parseInt(((index - 1000) / 100) + 1) });
        resp.renderData.nav.push({ "name": problem.title, "url": "/problem/" + index });
        resp.renderData.title = "[P" + index + "] " + problem.title + " - " + resp.renderData.title;
        resp.renderData.pageType = "problemlist";
        resp.renderData.problem = problem;

        resp.render("problem/info", resp.renderData);
    });
};

/**
 * Problem list
 * @param req
 * @param resp
 */
exports.list = function(req, resp) {
    resp.renderData.nav.push({ "name": "Problem List", "url": "/problem/list" });

    var contestProblemModel = new ContestProblemModel();

    var page = req.params.page;
    if(undefined === page) page = 1;
    else page = parseInt(page);

    async.series({
        "page": function(callback) {
            contestProblemModel.getPracticePageCount(function(err, pageCount) {
                if(page < 1 || page > pageCount) {
                    callback(new Error("Invalid page."));
                } else {
                    callback(null, pageCount);
                }
            });
        },
        "list": function(callback) {
            contestProblemModel.getPracticeList(page, function(err, result) {
                if(err) {
                    callback(err);
                    return;
                }

                callback(null, result);
            });
        }
    }, function(err, results) {
        if(err && err.message === "Invalid page") {
            return resp.redirect("/problem/list");
        } else if(err) {
            return resp.send(200, err.message);
        }

        resp.renderData.title = "练习题库 - 第 " + page + " 页 - " + resp.renderData.title;
        resp.renderData.nav.push({ "name": "Page " + page, "url": "/problem/list/" + page });
        resp.renderData.pageCount = results.page;
        resp.renderData.problemList = results.list;
        resp.renderData.page = page;
        resp.renderData.pageType = "problemlist";

        resp.render("problem/list", resp.renderData);
    });
};
