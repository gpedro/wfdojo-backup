var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test', function() {

  return gulp.src('app/spec/**/*.js')
    .pipe(jasmine());

});

gulp.task('watch', function() {

  gulp.watch('app/{src,spec}/**/*.js', ['test']);

});

gulp.task('default', ['watch', 'test']);
