/**
 * Created by XadillaX on 2015/3/29.
 */
var Toshihiko = require("toshihiko");
var ProbList = require("../lib/modelType/probList");

var UserModel = global.toshihiko.define("oj_user", [
    { name: "userId", column: "userid", primaryKey: true, type: Toshihiko.Type.Integer },
    { name: "username", type: Toshihiko.Type.String },
    { name: "password", type: Toshihiko.Type.String },
    { name: "roleId", column: "roleid", type: Toshihiko.Type.Integer },
    { name: "nickname", type: Toshihiko.Type.String },
    { name: "registerTime", column: "regtime", type: Toshihiko.Type.Integer },
    { name: "school", type: Toshihiko.Type.String },
    { name: "email", type: Toshihiko.Type.String },
    { name: "motto", type: Toshihiko.Type.String },
    { name: "language", type: Toshihiko.Type.Integer },

    { name: "solvedTimes", column: "solved", type: Toshihiko.Type.Integer },
    { name: "solvedCount", column: "solvednum", type: Toshihiko.Type.Integer },
    { name: "solvedList", column: "solvedlist", type: ProbList },

    { name: "submittedTimes", column: "submit", type: Toshihiko.Type.Integer },
    { name: "submittedCount", column: "submitnum", type: Toshihiko.Type.Integer },
    { name: "submittedList", column: "submitlist", type: ProbList },

    { name: "showAvatarBar", column: "avatarbar", type: Toshihiko.Type.Integer }
]);

module.exports = UserModel;
