/**
 * Created by XadillaX on 13-12-17.
 */
var indexController = require("../../controller/index");

exports.post = {  };
exports.get = {
    "/"         : indexController.index,
    "/index"    : indexController.index
};
