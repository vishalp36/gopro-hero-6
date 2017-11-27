const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const merge = require('merge-stream');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const srcset = require('gulp-srcset');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const gulpif = require('gulp-if');

const config = {
  src: 'src/',
  dist: 'dist/',
  port: 8080,
  env: process.env.NODE_ENV === 'production',
  copy: [
    {
      src: 'src/video/**/*',
      dist: 'dist/assets/video'
    },
    {
      src: 'src/data/**/*',
      dist: 'dist/assets/data'
    },
    {
      src: 'src/font/**/*',
      dist: 'dist/assets/font'
    }
  ]
};

gulp.task('liveserver', () => {
  browserSync.init({
    server: config.dist,
    port: config.port,
    open: 'local'
  });
});

gulp.task('sass', () => {
  const plugins = [autoprefixer({ browsers: ['last 1 version'] }), cssnano()];

  return gulp
    .src(`${config.src}scss/*.scss`)
    .pipe(
      plumber({
        errorHandler: notify.onError('SASS Error: <%= error.message %>')
      })
    )
    .pipe(gulpif(!config.env, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!config.env, sourcemaps.write()))
    .pipe(postcss(plugins))
    .pipe(
      rename(path => {
        path.basename += '.min';
      })
    )
    .pipe(gulp.dest(`${config.dist}assets/css`))
    .pipe(browserSync.stream());
});

gulp.task('javascript', () =>
  browserify({
    entries: `${config.src}js/app.js`,
    debug: true
  })
    .transform(babelify, { presets: ['flow', 'env'] })
    .on('error', gutil.log)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(`${config.dist}assets/js`))
    .pipe(browserSync.stream())
);

gulp.task('srcset', () => {
  gulp
    .src(`${config.src}img/src/*`)
    .pipe(
      srcset([
        {
          width: [1, 1920, 1280, 720, 560, 320],
          format: ['jpg', 'png']
        }
      ])
    )
    .pipe(gulp.dest(`${config.src}img`));
});

gulp.task('images', () =>
  gulp
    .src(`${config.src}img/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${config.dist}assets/img`))
    .pipe(browserSync.stream())
    .pipe(
      notify(
        'Image minified and added new widths of images: <%= file.relative %>'
      )
    )
);

gulp.task('copy', () => {
  const tasks = config.copy.map(resource =>
    gulp
      .src(resource.src)
      .pipe(gulp.dest(resource.dist))
      .pipe(browserSync.stream())
  );

  return merge(tasks);
});

gulp.task('pug', () =>
  gulp
    .src(`${config.src}*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream())
);

gulp.task('build', gulp.series('pug', 'sass', 'javascript', 'images', 'copy'));

gulp.task(
  'default',
  gulp.parallel('build', 'liveserver', () => {
    gulp.watch(`${config.src}**/*.pug`, gulp.parallel('pug'));
    gulp.watch(`${config.src}scss/**/*.scss`, gulp.parallel('sass'));
    gulp.watch(`${config.src}js/**/*.js`, gulp.parallel('javascript'));
    gulp.watch(`${config.src}img/**/*`, gulp.parallel('images'));
  })
);
