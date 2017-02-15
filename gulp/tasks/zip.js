'use strict';

module.exports = function() {
  $.gulp.task('zip', function() {
      return $.gulp.src('./build/**/**/*')
          .pipe($.gp.zip('/gulp-builder.zip'))
          .pipe($.gulp.dest('./'))
  });
};
