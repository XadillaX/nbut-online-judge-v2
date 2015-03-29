var express = require("express");
var router = express.Router();

router.get("/", function(_, resp) {
    resp.redirect("/index");
});

router.get("/index", function(req, resp) {
    resp.render("index/index", { pageType: "home" });
});

module.exports = router;
router.root = "/";
