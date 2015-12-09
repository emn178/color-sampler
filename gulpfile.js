var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");

gulp.task('default', ['build']);
gulp.task('build', ['uglify', 'minify-css']);

gulp.task('uglify', function () {
  return gulp.src('src/color-sampler.js')
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('build'));
});

gulp.task('minify-css', function () {
  return gulp.src('src/color-sampler.css')
    .pipe(minifyCss({ compatibility: 'ie8' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('build'));
});
