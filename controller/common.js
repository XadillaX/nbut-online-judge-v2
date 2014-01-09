/**
 * Created by XadillaX on 13-12-21.
 */
var functions = require("../util/functions");
var helper = require("../helper");
var async = require("async");
var urlencode = require("urlencode");

exports.refreshTooFast = function(req, resp, next) {
    next();
};

/**
 * 预处理
 * @param req
 * @param resp
 * @param next
 */
exports.pretreatment = function(req, resp, next) {
    resp.renderData = functions.defaultRenderData();
    resp.renderData.currentUrl = req.url;
    resp.renderData.currentUrlEncoded = urlencode(req.url);

    async.waterfall([
        function(callback) {
            if(req.session.username) {
                resp.renderData.loggedIn = {
                    username    : req.session.username,
                    email       : req.session.email,
                    gravatar    : req.session.gravatar
                };

                /**
                 * 题数
                 */
                var userModel = helper.common.model("user");
                userModel.getProblemCount(req.session.username, function(err, submit, solved) {
                    if(err) {
                        submit = "-";
                        solved = "-";
                    }

                    resp.renderData.loggedIn.submitCount = submit;
                    resp.renderData.loggedIn.solvedCount = solved;

                    callback(null);
                });
            } else {
                resp.renderData.loggedIn = false;
                callback(null);
            }
        }
    ], function() {
        next();
    });
};

exports.isLoggedIn = function(req, resp, next) {
    next();
};
