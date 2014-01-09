/**
 * Created by XadillaX on 14-1-9.
 */
var helper = require("../../helper");
var jsContrller = helper.common.controller("js");

exports.post = {  };
exports.get = {
    "/.js/:files"       : jsContrller.merge
};
