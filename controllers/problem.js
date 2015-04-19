/**
 * Created by XadillaX on 2015/4/6.
 */
var express = require("express");
var async = require("async");
var router = express.Router();

var helper = require("../lib/helper");
var ContestProblem = helper.common.getModel("contestProblem");

var PRACTICE_CONTEST_ID = 1;
var LIST_PER_PAGE = 100;

router.get(/^\/list(\/(\d+\/?)?)?$/, function(req, resp, next) {
    var page = parseInt((req.params[1] === undefined) ? 1 : req.params[1]);
    var context = {};
    if(isNaN(page) || page < 1) return resp.redirect("/problem/list");

    async.waterfall([
        function(callback) {
            ContestProblem.getTotalPage(PRACTICE_CONTEST_ID, LIST_PER_PAGE, function(err, pages) {
                if(err) return callback(err);
                if(pages < page) {
                    return resp.redirect("/problem/list");
                }

                context.pages = pages;
                callback();
            });
        },

        function(callback) {
            ContestProblem.getProblemListByPage(PRACTICE_CONTEST_ID, page, LIST_PER_PAGE, callback);
        },

        function(problems, callback) {
            if(!resp.isLoggedIn()) return callback(undefined, problems);

            callback(undefined, problems.map(function(problem) {
                problem.isSolvedByMe = req.user.solvedList.indexOf(parseInt(problem.index)) >= 0;
                return problem;
            }));
        }
    ], function(err, problems) {
        if(err) return next(err);

        resp.renderData.nav.push({ name: "Problems", url: "/problem/list" });
        resp.renderData.nav.push({ name: "Page " + page, url: "/problem/list/" + page });

        resp.render("problem/list", { problems: problems, totalPages: context.pages, currentPage: page, pageType: "problemlist" });
    });
});

router.get("/:index([0-9]{4})", function(req, resp, next) {
    var context = {};
    async.waterfall([
        function(callback) {
            ContestProblem.getProblemInformation(1, req.params.index, function(err, problem) {
                if(err) return callback(err);
                context.problem = problem;
                callback();
            });
        },

        function(callback) {
            if(!context.problem) return callback();
            ContestProblem.getAProblemsPosition(1, req.params.index, function(err, pos) {
                if(err) return callback(err);
                var page = parseInt(pos / LIST_PER_PAGE);
                if(pos % LIST_PER_PAGE) page++;
                if(!page) page = 1;

                context.page = page;
                callback();
            });
        }
    ], function(err) {
        if(err) {
            next(err);
        }

        if(!context.problem) {
            return resp.render404(next);
        }

        var problem = context.problem;
        var page = context.page;
        resp.renderData.nav.push({ name: "Problems", url: "/problem/list" });
        resp.renderData.nav.push({ name: "Page " + page, url: "/problem/list/" + page + "#prob-" + problem.index });
        resp.renderData.nav.push({ name: "P" + problem.index + " - " + problem.title, url: "/problem/" + problem.index });
        resp.renderData.scripts.push("/js/probinfo.js");

        resp.render("problem/info", { problem: problem, page: page, pageType: "problemlist" });
    });
});

module.exports = router;
router.root = "/problem";

