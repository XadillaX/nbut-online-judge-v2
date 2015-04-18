/**
 * XadillaX created at 2015-04-18 23:08:07
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved
 */
var express = require("express");
var router = express.Router();

router.get("/", renderFeed);
router.get("/:problemId", renderFeed);
function renderFeed(req, resp) {
    resp.send("You're to feed" + (req.params.problemId ? " P" + req.params.problemId : "") + ".");
}

module.exports = router;
router.root = "/feedcode";

