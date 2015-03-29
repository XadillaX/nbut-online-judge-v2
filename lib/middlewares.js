/**
 * Created by XadillaX on 2015/3/29.
 */
var config = require("../config");

/**
 * initialize the render data middleware
 * @param req
 * @param resp
 * @param next
 */
exports.renderData = function(req, resp, next) {
    var renderData = resp.renderData = Object.clone(config.renderData, true);
    renderData.startTimestamp = +new Date();
    renderData.nav = [ { "name": "Home", "url": "/" } ];
    renderData.referer = req.headers.referer || "/index";
    renderData.scripts = [];
    next();
};

/**
 * check the login status middleware
 * @param req
 * @param resp
 * @param next
 */
exports.loginStatus = function(req, resp, next) {
    // TODO: check login status
    resp.renderData.loggedIn = false;
    next();
};
