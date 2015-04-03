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
    renderData.scripts = [  ];
    next();
};

/**
 * check the login status middleware
 * @param req
 * @param resp
 * @param next
 */
exports.loginStatus = function(req, resp, next) {
    resp.renderData.loggedIn = false;

    if(!req.session || undefined === req.session.userId) {
        return next();
    }

    var User = require("../models/userModel");
    User.findById(req.session.userId, function(err, user) {
        if(err) return next();
        if(!user) {
            delete req.session.userId;
            return next();
        }

        req.user = user;
        resp.renderData.loggedIn = user.toJSON();
        resp.renderData.loggedIn.avatar = User.getGravatar(user.email, 32);
        next();
    });
};
