/**
 * Created by XadillaX on 13-12-17.
 */
var functions = require("../util/functions");

exports.index = function(req, resp) {
    resp.renderData.pageType = "home";

    resp.render("index/index", resp.renderData);
};
