/**
 * Created by XadillaX on 13-12-21.
 */
var userController = require("../../controller/user");

exports.post = {
    "/api/secure/signin"                    : userController.signinApi
};
exports.get = {
    "/api/user/gravatar/:username/:size"    : userController.gravatarApi,
    "/api/user/gravatar/:username"          : userController.gravatarApi,

    "/secure/signin"                        : userController.signin,
    "/secure/signout"                       : userController.signout
};
