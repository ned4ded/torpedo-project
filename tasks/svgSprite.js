const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const svgSprite = require('gulp-svg-sprite');
const config = require('../gulpfile.config');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;

module.exports = gulp.task('svgSprite', function() {
  return gulp.src('./src/assets/icons/*.svg')
    .pipe(svgSprite({
      shape: {
        transform: [{
          svgo: {
            plugins: [{
                removeViewBox: false
              },
              {
                removeDimensions: true
              },
              {
                removeAttrs: {
                  attrs: 'fill'
                }
              },
            ]
          }
        }, ]
      },
      mode: {
        symbol: {
          prefix: '.',
          dimensions: '%s',
          sprite: path.join(config.server.assets, 'sprite.svg'),
          bust: false,
          render: {
            scss: {
              dest: path.join(config.paths.stylesSvgSprite, '_sprite.scss'),
              template: config.paths.svgTemplate,
            },
          },
          example: {
            dest: path.join( config.server.serveFolder, 'example.html'),
          },
        },
      },
      svg: {
        transform: [
          function(svg) {
            const s = new XMLSerializer();

            const styles = fs.readFileSync(config.paths.svgStylesTemplate, 'utf-8');

            const parsedStyles = new DOMParser().parseFromString(styles, "image/svg+xml");
            const parsedSvg = (new DOMParser().parseFromString(svg,"image/svg+xml"));

            const svgTag = parsedSvg.getElementsByTagName('svg')[0];

            svgTag.insertBefore(parsedStyles.getElementsByTagName('svg')[0].firstChild, svgTag.firstChild);

            return s.serializeToString(parsedSvg);
          }
        ]
      }
    }))
    .pipe(gulp.dest(path.join(__dirname, '..')))
});
