/**
 * Created by XadillaX on 13-12-21.
 */
var problemController = require("../../controller/problem");

exports.post = {};

exports.get = {
    "/problem/list"             : problemController.list,
    "/problem/list/:page"       : problemController.list,

    "/problem/:index"           : problemController.info
};
