/**
 * Created by XadillaX on 2015/3/29.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var opts = require("nomnom").option("action", {
    position: 0,
    default: "watch",
    help: "the gulp action"
}).script("gulp").parse();

if(opts.action === "watch") {
    var dev = require("./gulp/dev");
    gulp.task("watch", ["dev-mode"]);
    gulp.task("default", [ "watch" ]);
}
