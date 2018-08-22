const gulp = require('gulp');
const config = require('../gulpfile.config');

module.exports = (browserSync) => gulp.task('html', function() {
  return gulp.src(config.paths.pages)
    .pipe(gulp.dest(config.server.serveFolder))
    .pipe(browserSync.stream());
});
