const gulp = require('gulp');
const data = require('gulp-data');
const rename = require("gulp-rename");
const nunjucksRender = require('gulp-nunjucks-render');
const locals = {
  ru: {
    prefix: '',
    content: require('../src/pages/locals/ru.local.json')
  },
  en: {
    prefix: 'en.',
    content: require('../src/pages/locals/en.local.json')
  },
};

module.exports = (browserSync) => gulp.task('render', function() {
  return Object.keys(locals).forEach(key => {
    return gulp.src('src/pages/*.+(html|njk)')
    .pipe(data(() => {
      return locals[key].content;
    }))
    .pipe(nunjucksRender({
      path: ['src/pages/templates'],
    }))
    .pipe(rename(function(path) {
      path.basename = locals[key].prefix + path.basename;
    }))
    .pipe(gulp.dest('www/'))
    .pipe(browserSync.stream());
  })

});
