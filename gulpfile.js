const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');

const config = {
  src: 'src/',
  dist: 'dist/',
  port: 8080
};

gulp.task('liveserver', () => {
  browserSync.init({
    server: config.dist,
    port: config.port,
    open: 'local'
  });
});

gulp.task('sass', () =>
  gulp
    .src(config.src + 'scss/*.scss')
    .pipe(
      plumber({
        errorHandler: notify.onError('SASS Error: <%= error.message %>')
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(
      rename(path => {
        path.basename += '.min';
      })
    )
    .pipe(gulp.dest(config.dist + 'assets/css'))
    .pipe(browserSync.stream())
);

gulp.task('javascript', () =>
  browserify({
    entries: config.src + 'js/app.js',
    debug: true
  })
    .transform(babelify, { presets: ['es2015'] })
    .on('error', gutil.log)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.dist + 'assets/js'))
    .pipe(browserSync.stream())
);

gulp.task('images', () =>
  gulp
    .src(config.src + 'img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist + 'assets/img'))
    .pipe(browserSync.stream())
    .pipe(notify('Image minified: <%= file.relative %>'))
);

gulp.task('fonts', () =>
  gulp
    .src(config.src + 'font/**/*')
    .pipe(gulp.dest(config.dist + 'assets/font'))
    .pipe(browserSync.stream())
);

gulp.task('html', () =>
  gulp
    .src(config.src + '*.html')
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream())
);

gulp.task('watch', () => {
  gulp.watch(config.src + '**/*.html', ['html']);
  gulp.watch(config.src + 'scss/**/*.scss', ['sass']);
  gulp.watch(config.src + 'js/*.js', ['javascript']);
  gulp.watch(config.src + 'img/**/*', ['images']);
  gulp.watch(config.src + 'font/*', ['fonts']);
});

gulp.task('build', ['html', 'sass', 'javascript', 'images', 'fonts'], () => {});

gulp.task('default', ['build', 'liveserver', 'watch'], () => {});
