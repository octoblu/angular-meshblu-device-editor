gulp           = require 'gulp'
templateCache  = require 'gulp-angular-templatecache'
bower          = require 'gulp-bower'
clean          = require 'gulp-clean'
coffee         = require 'gulp-coffee'
concat         = require 'gulp-concat'
plumber        = require 'gulp-plumber'
sourceMaps     = require 'gulp-sourcemaps'
uglify         = require 'gulp-uglify'
webserver      = require 'gulp-webserver'
mainBowerFiles = require 'main-bower-files'

gulp.task 'bower', -> bower()

gulp.task 'build', ['build-coffee', 'build-templates'], ->
  gulp.src ['./dist/compiled-coffee.js', './dist/compiled-templates.js']
      .pipe plumber()
      .pipe sourceMaps.init()
      .pipe concat('angular-meshblu-device-editor.js')
      .pipe uglify()
      .pipe sourceMaps.write()
      .pipe gulp.dest('./dist/')

gulp.task 'build-coffee', ->
  gulp.src './src/**/*.coffee'
      .pipe plumber()
      .pipe sourceMaps.init()
      .pipe coffee()
      .pipe concat('compiled-coffee.js')
      .pipe sourceMaps.write()
      .pipe gulp.dest('./dist/')

gulp.task 'build-deps', ['bower'], ->
  gulp.src mainBowerFiles({filter: /\.js$/})
      .pipe plumber()
      .pipe sourceMaps.init()
      .pipe concat('dependencies.js')
      .pipe uglify()
      .pipe sourceMaps.write()
      .pipe gulp.dest('./dist/')

gulp.task 'build-templates', ->
  gulp.src './src/**/*.html'
      .pipe plumber()
      .pipe sourceMaps.init()
      .pipe templateCache({module: 'angular-meshblu-device-editor'})
      .pipe concat('compiled-templates.js')
      .pipe sourceMaps.write()
      .pipe gulp.dest('./dist/')

gulp.task 'clean', ->
  gulp.src './dist/', read: false
      .pipe clean()

gulp.task 'webserver', ['bower', 'build', 'build-deps'], ->
  gulp.src '.'
      .pipe webserver()
  gulp.watch './src/**/*', ['build']
  gulp.watch './bower.json', ['build-deps']

gulp.task 'default', [
  'build'
  'build-deps'
]
