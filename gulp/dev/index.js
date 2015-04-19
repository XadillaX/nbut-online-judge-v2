/**
 * Created by XadillaX on 2015/3/29.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
require("./bootstrap");
require("./sweetalert");

gulp.task("favicon", function() {
    return gulp.src("statics/src/favicon.ico")
        .pipe(gulp.dest("statics/dev"))
        .pipe($.size());
});

gulp.task("require", function() {
    return gulp.src("statics/src/vender/requirejs/require.js")
        .pipe($.rename({ basename: "r" }))
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

gulp.task("javascript", function() {
    return gulp.src("statics/src/js/**/*.js")
        .pipe(gulp.dest("statics/dev/js"))
        .pipe($.size());
});

gulp.task("headroom", function() {
    return gulp.src("statics/src/vender/headroom.js/dist/**/*.js")
        .pipe(gulp.dest("statics/dev/js"))
        .pipe($.size());
});

gulp.task("codemirror", function() {
    return gulp.src("statics/src/vender/codemirror/**/*.{css,js}")
        .pipe(gulp.dest("statics/dev/codemirror"))
        .pipe($.size());
});

gulp.task("dev-mode", [
    "favicon",

    "require",
    "jquery",
    "bootstrap",
    "sweetalert",
    "headroom",

    "less",

    "codemirror",

    "images",
    "javascript"
], function() {
    gulp.watch("statics/src/favicon.ico", [ "favicon" ]);
    gulp.watch("statics/src/less/**/*.less", [ "less" ]);
    gulp.watch("statics/src/images/**/*", [ "images" ]);
    gulp.watch("statics/src/js/**/*.js", [ "javascript" ]);
    gulp.watch("statics/src/vender/codemirror/**/*.(css|js)");
});
