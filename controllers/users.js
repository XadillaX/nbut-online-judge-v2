var express = require("express");
var router = express.Router();
var User = require("../models/userModel");

router.get("/:userId", function(req, resp) {
    User.findById(req.param("userId")).success(function(user) {
        return user ?
            resp.send("<pre>" + JSON.stringify(user.toJSON(), true, 2) + "</pre>") :
            resp.send("Not found");
    }).error(function(err) {
        resp.send(err.message);
    });
});

module.exports = router;
router.root = "/users";
