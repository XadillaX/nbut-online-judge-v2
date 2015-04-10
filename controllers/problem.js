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

        resp.render("problem/list", { problems: problems, totalPages: context.pages, currentPage: page });
    });
});

module.exports = router;
router.root = "/problem";
