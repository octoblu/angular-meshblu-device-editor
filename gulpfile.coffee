gulp    = require 'gulp'
bower   = require 'gulp-bower'
clean   = require 'gulp-clean'
coffee  = require 'gulp-coffee'
concat  = require 'gulp-concat'
plumber = require 'gulp-plumber'
uglify  = require 'gulp-uglify'
mainBowerFiles = require 'main-bower-files'

gulp.task 'bower', -> bower()

gulp.task 'build', ->
  gulp.src './src'
      .pipe plumber()
      .pipe coffee()
      .pipe concat('angular-meshblu-device-editor.js')
      .pipe uglify()
      .pipe gulp.dest './dist'

gulp.task 'build-deps', ->
  gulp.src mainBowerFiles({filter: /\.js$/})
      .pipe plumber()
      .pipe concat('dependencies.js')
      .pipe uglify()
      .pipe gulp.dest './dist'

gulp.task 'clean', ->
  gulp.src './dist', read: false
      .pipe clean()

gulp.task 'default', [
  'clean'
  'bower'
  'build-deps'
  'build'
]
