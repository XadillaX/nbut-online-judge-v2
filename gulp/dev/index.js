/**
 * Created by XadillaX on 2015/3/29.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
require("./bootstrap");

gulp.task("favicon", function() {
    return gulp.src("statics/src/favicon.ico")
        .pipe(gulp.dest("statics/dev"))
        .pipe($.size());
});

gulp.task("jquery", function() {
    return gulp.src("statics/src/vender/jquery/dist/jquery.js")
        .pipe(gulp.dest("statics/dev/js"))
        .pipe($.size());
});

gulp.task("less", function() {
    return gulp.src("statics/src/less/**/*.less")
        .pipe($.less())
        .pipe(gulp.dest("statics/dev/css"))
        .pipe($.size());
});

gulp.task("images", function() {
    return gulp.src("statics/src/images/**/*")
        .pipe(gulp.dest("statics/dev/images"))
        .pipe($.size());
});

gulp.task("dev-mode", [
    "favicon",

    "jquery",
    "bootstrap",

    "less",

    "images"
], function() {
    gulp.watch("statics/src/favicon.ico", [ "favicon" ]);
    gulp.watch("statics/src/less/**/*.less", [ "less" ]);
    gulp.watch("statics/src/images/**/*", [ "images" ]);
});
