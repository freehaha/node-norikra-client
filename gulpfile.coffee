gulp = require('gulp')
coffee = require('gulp-coffee')
gutil = require('gulp-util')

gulp.task 'coffee', ->
  SRC=['index.coffee', './lib/**/*.coffee']
  gulp.src(SRC, {base: '.'})
    .pipe(coffee({bare: true})).on('error', gutil.log)
    .pipe(gulp.dest('.'))

gulp.task 'default', ['coffee']
