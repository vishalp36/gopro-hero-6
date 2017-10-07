const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');

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
  gulp
    .src(config.src + 'js/*.js')
    .pipe(
      plumber({
        errorHandler: notify.onError('JS Error: <%= error.message %>')
      })
    )
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(
      minify({
        ext: {
          src: '.js',
          min: '.min.js'
        },
        ignoreFiles: ['.min.js'],
        noSource: false
      })
    )
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
