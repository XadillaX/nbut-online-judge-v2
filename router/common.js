/**
 * Created by XadillaX on 13-12-21.
 */
var commonController = require("../controller/common");

exports.commonGet = [
    commonController.refreshTooFast,
    commonController.pretreatment,
    commonController.isLoggedIn
];
