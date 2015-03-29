/**
 * Created by XadillaX on 2015/3/29.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

gulp.task("bs-font", function() {
    return gulp.src("statics/src/vender/bootstrap/dist/fonts/*")
        .pipe(gulp.dest("statics/dev/fonts"))
        .pipe($.size());
});

gulp.task("bs-css", function() {
    return gulp.src("statics/src/vender/bootstrap/dist/css/*.css")
        .pipe(gulp.dest("statics/dev/css"))
        .pipe($.size());
});

gulp.task("bs-js", function() {
    return gulp.src("statics/src/vender/bootstrap/dist/js/*.js")
        .pipe(gulp.dest("statics/dev/js"))
        .pipe($.size());
});

gulp.task("bootstrap", [ "bs-font", "bs-css", "bs-js" ]);
