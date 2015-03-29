var express = require("express");
var router = express.Router();
var User = require("../models/userModel");

router.get("/gravatar/:username/:size", function(req, resp) {
    var username = req.params.username;
    var size = req.params.size;

    User.where({ username: username }).findOne(function(err, user) {
        if(err || !user) {
            return resp.send(200, "/images/default-avatar.gif");
        }

        resp.send(200, User.getGravatar(user.email, size));
    });
});

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
