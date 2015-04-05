/**
 * Created by XadillaX on 2015/4/6.
 */
var Toshihiko = require("toshihiko");

var ProblemModel = global.toshihiko.define("oj_problem", [
    { name: "problemId", column: "problemid", primaryKey: true, type: Toshihiko.Type.Integer },
    { name: "title", type: Toshihiko.Type.String, validators: [
        function(v) {
            if(Buffer.byteLength(v) > 255) return "标题太长了。";
        }
    ]},
    { name: "description", type: Toshihiko.Type.String },
    { name: "input", type: Toshihiko.Type.String },
    { name: "output", type: Toshihiko.Type.String },
    { name: "sampleInput", column: "sampleinput", type: Toshihiko.Type.String },
    { name: "sampleOutput", column: "sampleoutput", type: Toshihiko.Type.String },
    { name: "hint", type: Toshihiko.Type.String },
    { name: "source", type: Toshihiko.Type.String },
    { name: "addTime", type: Toshihiko.Type.Integer },
    { name: "timeLimit", column: "timelimit", type: Toshihiko.Type.Integer },
    { name: "memoLimit", column: "memorylimit", type: Toshihiko.Type.Integer },
    { name: "inputMD5", column: "inputmd5", type: Toshihiko.Type.String },
    { name: "outputMD5", column: "outputmd5", type: Toshihiko.Type.String }
]);

module.exports = ProblemModel;
