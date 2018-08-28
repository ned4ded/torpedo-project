const gulp = require('gulp');
const data = require('gulp-data');
const nunjucksRender = require('gulp-nunjucks-render');
const locals = {
  ru: require('../src/pages/locals/ru.local.json'),
};

module.exports = (browserSync) => gulp.task('render', function() {
  return Object.keys(locals).forEach(key => {
    return gulp.src('src/pages/*.+(html|njk)')
    .pipe(data(() => {
      return locals[key];
    }))
    .pipe(nunjucksRender({
      path: ['src/pages/templates'],
    }))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream());
  })

});
