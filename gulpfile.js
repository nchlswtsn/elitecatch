var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var dir = {
  src: {
    images: 'src/images/*',
    templates: 'src/template/**/*',
    js: 'src/js/**/*',
    scss: 'src/style/**/*.scss',
    bower: 'src/bower_components/**/*'
  },
  dest: {
    images: 'public/images',
    html: 'public/html',
    js: 'public/js',
    css: 'public/style',
    bower: 'public/bower_components'
  }
}

gulp.task('sass', function() {
  return gulp.src(dir.src.scss)
    .pipe(sass())
    .pipe(gulp.dest(dir.dest.css));
});

gulp.task('scripts', function() {
  return gulp.src(dir.src.js)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dir.dest.js))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dir.dest.js))
})

gulp.task('html', function() {
  return gulp.src(dir.src.templates)
    .pipe(gulp.dest(dir.dest.html))
})

gulp.task('images', function() {
  return gulp.src(dir.src.images)
    .pipe(gulp.dest(dir.dest.images))
});

gulp.task('bower', function() {
  return gulp.src(dir.src.bower)
    .pipe(gulp.dest(dir.dest.bower))
})

gulp.task('watch', function() {
  gulp.watch(dir.src.js, ['scripts']);
  gulp.watch(dir.src.scss, ['sass']);
  gulp.watch(dir.src.templates, ['html']);
  gulp.watch(dir.src.images, ['images']);
  gulp.watch(dir.src.images, ['bower']);
});

gulp.task('default', ['sass', 'scripts', 'html', 'images', 'bower', 'watch']);

gulp.task('deploy', ['sass', 'scripts', 'html', 'images', 'bower']);
