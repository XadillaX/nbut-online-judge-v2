var express = require("express");
var md5 = require("MD5");
var router = express.Router();

var helper = require("../lib/helper");
var User = helper.common.getModel("user");

/**
 * 用户头像地址
 */
router.get("/gravatar/:username/:size", function(req, resp) {
    var username = req.params.username;
    var size = req.params.size;

    User.where({ username: username }).findOne(function(err, user) {
        if(err || !user) {
            return resp.send("/images/default-avatar.gif");
        }

        resp.send(User.getGravatar(user.email, size));
    });
});

/**
 * 登出
 */
router.get("/signout", function(req, resp) {
    if(resp.isLoggedIn()) {
        delete req.session.userId;
    }

    resp.redirect(req.headers.referer || "/");
});

/**
 * 登入（动作）
 */
router.post("/signin", function(req, resp) {
    if(resp.isLoggedIn()) {
        return this.error("主人你已经登录啦。");
    }

    var username = req.body.username;
    var password = req.body.password;

    if(!username || username.length < 4 || username.length > 16) {
        return this.error("请输入正确长度的用户名。");
    }

    if(!password || password.length < 5 || password.length > 16) {
        return this.error("请输入正确长度的密码。");
    }

    User.where({ username: username }).findOne(function(err, user) {
        if(err) {
            console.error(err);
            return resp.error("服务器感冒啦，请稍后重试。");
        }

        if(!user) {
            return resp.error("错误的用户名或者密码。");
        }

        if(user.password.toLowerCase() !== md5(password).toLowerCase()) {
            return resp.error("错误的用户名或者密码。");
        }

        req.session.userId = user.userId;

        resp.send({ status: 1 });
    });
});

/**
 * 登入（界面）
 */
router.get("/signin", function(req, resp) {
    if(resp.isLoggedIn()) {
        return this.redirect("/index");
    }

    resp.renderData.scripts.push("/js/signin.js");
    resp.renderData.nav.push({ name: "Sign In", url: "/secure/signin" });
    resp.render("secure/signin", {});
});

module.exports = router;
router.root = "/secure";
