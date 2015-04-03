/**
 * Created by XadillaX on 2015/4/3.
 */
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

gulp.task("sweetalertcss", function() {
    return gulp.src("statics/src/vender/sweetalert/lib/sweet-alert.css")
        .pipe(gulp.dest("statics/dev/css"))
        .pipe($.size());
});

gulp.task("sweetalertjs", function() {
    return gulp.src("statics/src/vender/sweetalert/lib/sweet-alert.js")
        .pipe(gulp.dest("statics/dev/js"))
        .pipe($.size());
});

gulp.task("sweetalert", [ "sweetalertcss", "sweetalertjs" ]);
