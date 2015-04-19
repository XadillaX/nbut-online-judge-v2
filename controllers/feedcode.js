/**
 * XadillaX created at 2015-04-18 23:08:07
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved
 */
var async = require("async");
var express = require("express");
var helper = require("../lib/helper");
var router = express.Router();
var LIST_PER_PAGE = 100;

router.get("/", renderFeed);
router.get("/:problemId([0-9]{4})", renderFeed);
function renderFeed(req, resp, next) {
    resp.renderData.scripts.push("/js/feedcode.js");

    var ContestProblem = helper.common.getModel("contestProblem");
    async.waterfall([
        function(callback) {
            if(req.params.problemId === undefined) {
                return callback();
            }

            ContestProblem.getAProblemsPosition(1, req.params.problemId, function(err, pos) {
                if(err) {
                    err.status = 404;
                    return callback(err);
                }

                var page = parseInt(pos / LIST_PER_PAGE);
                if(pos % LIST_PER_PAGE) page++;
                if(!page) page = 1;

                callback(undefined, page);
            });
        }
    ], function(err, page) {
        if(err) {
            return next(err);
        }

        resp.renderData.nav.push({ name: "Problems", url: "/problem/list" });
        if(undefined !== page) {
            resp.renderData.nav.push({
                name: "Page " + page, 
                url: "/problem/list/" + page + "#prob-" + req.params.problemId
            });
            resp.renderData.nav.push({
                name: "P" + req.params.problemId,
                url: "/problem/" + req.params.problemId
            });
        }

        resp.renderData.nav.push({
            name: "Feed Code",
            url: "/feedcode" + (req.params.problemId !== undefined ? "/" + req.params.problemId : "")
        });

        resp.render("feedcode/index", {
            pageType: "feedcode",
            index: req.params.problemId
        });
    });
}

module.exports = router;
router.root = "/feedcode";

