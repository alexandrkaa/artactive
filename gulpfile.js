"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var server = require('browser-sync').create();
var concat = require('gulp-concat');
var includejs = require('gulp-include');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

gulp.task('minifyhtml', function () {
  return gulp.src('build/*.html')
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(gulp.dest('build'));
});

gulp.task('concat-scripts', function() {
  return gulp.src('source/js/main.js')
    .pipe(includejs({
      extensions: 'js',
    includePaths: [__dirname]
    }))
      .on('error', console.log)
    .pipe(rename('app.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('compressjs', function () {
  return gulp.src('build/js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('build/js'))
});

gulp.task('js', gulp.series('concat-scripts', 'compressjs'));

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 4}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
  .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
      'source/js/**',
      'source/humans.txt'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});


gulp.task('copy_wp', function () {
  return gulp.src([
      'build/fonts/**/*.{woff,woff2}',
      'build/img/**',
      'build/js/**',
      'build/css/**',
      'build/*.html',
      'build/humans.txt'
    ], {
      base: 'build'
    })
    .pipe(gulp.dest('wp-content/themes/paradoxprava/assets'));
});

gulp.task('clean', function () {
 return del('build');
});

gulp.task('clean_wp', function () {
 return del('wp-content/themes/paradoxprava/assets');
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({includePaths: require('node-normalize-scss').includePaths}))
    //.pipe(sourcemaps.write({includeContent: false}))
    //.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([autoprefixer()]))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    //.pipe(sourcemaps.write('./build/css'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series("css"));
  gulp.watch('source/js/*.js', gulp.series('js', 'html', 'minifyhtml', 'refresh'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'minifyhtml', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'minifyhtml', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('img', gulp.series('images', 'webp', 'copy'));
//gulp.task('build', gulp.series('clean', 'copy', 'css', 'sprite', 'js', 'html', 'minifyhtml', 'clean_wp', 'copy_wp'));
gulp.task('build', gulp.series('clean', 'copy', 'css', 'sprite', 'js', 'html', 'minifyhtml'));
//gulp.task('deploy', gulp.series('build', 'publish'));
gulp.task('start', gulp.series('build', 'server'));
