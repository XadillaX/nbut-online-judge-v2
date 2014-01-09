/**
 * Created by XadillaX on 13-12-21.
 */
var helper = require("../helper");

/**
 * sign in the system
 * @param req
 * @param resp
 */
exports.signin = function(req, resp) {
    resp.renderData.title = "登录 *´∀`)*´∀`)´∀`)*´∀`)*´∀`) - " + resp.renderData.title;
    resp.renderData.nav.push({ name: "Sign In", url: "/secure/signin" });

    if(req.headers.referer) {
        resp.renderData.referer = req.headers.referer;
    } else {
        resp.renderData.referer = "/index";
    }

    resp.render("user/signin", resp.renderData);
};

exports.signout = function(req, resp) {
    delete req.session.userid;
    delete req.session.username;
    delete req.session.email;
    delete req.session.gravatar;

    if(req.headers.referer) {
        resp.redirect(req.headers.referer);
    } else {
        resp.redirect("/index");
    }
};

/**
 * 登录api
 * @param req
 * @param resp
 * @returns {*|ServerResponse}
 */
exports.signinApi = function(req, resp) {
    var result = {};
    var username = req.body.username;
    var password = req.body.password;

    if(!username || username.length < 3 || username.length > 16) {
        result.status = false;
        result.msg = "用户名的长度应该在3 ~ 16个字符。";
        return resp.send(200, result);
    }

    if(!password || password.length > 16) {
        result.status = false;
        result.msg = "密码的长度应该在1 ~ 16个字符。";
        return resp.send(200, result);
    }

    var userModel = helper.common.model("user");
    userModel.verifyLogin(username, password, function(err, userInfo) {
        if(err) {
            result.status = false;
            result.msg = err.message;
        } else {
            req.session.userid = userInfo.userid;
            req.session.username = userInfo.username;
            req.session.email = userInfo.email.toLowerCase();
            req.session.gravatar = helper.common.gravatar(userInfo.email.toLowerCase());

            result.status = true;
        }

        resp.send(200, result);
    });
};

/**
 * 获取头像的API
 * @param req
 * @param resp
 * @returns {*|ServerResponse}
 */
exports.gravatarApi = function(req, resp) {
    var username = req.params.username;
    var size = req.params.size;
    if(!size) {
        size = 64;
    }

    if(!username) {
        return resp.send(200, "/images/default-avatar.gif");
    }

    /**
     * 获取头像地址
     * @type {*}
     */
    var userModel = helper.common.model("user");
    userModel.getGravatar(username, size, function(err, result) {
        if(err) {
            resp.send(200, "/images/default-avatar.gif");
        } else {
            resp.send(200, result);
        }
    });
};
