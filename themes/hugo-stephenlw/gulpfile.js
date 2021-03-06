var gulp             = require('gulp'),
	compass          = require('gulp-compass'),
	autoprefixer     = require('gulp-autoprefixer'),
	sourcemaps 		 = require('gulp-sourcemaps'),
	cssnano          = require('gulp-cssnano'),
	uglify           = require('gulp-uglify'),
	rename           = require('gulp-rename'),
	concat           = require('gulp-concat'),
	path             = require('path');

gulp.task('default', ['styles', 'scripts'], function(){
	gulp.watch('static_src/scss/**/*.scss', ['styles']);
	gulp.watch('static_src/js/**/*.js', ['scripts']);
});

gulp.task('build', ['styles', 'scripts']);

gulp.task('styles', function() {
	gulp.src(['static_src/css/**/*.css'])
		.pipe(cssnano())
		.pipe(gulp.dest('static/css'));
	return gulp.src(['static_src/scss/**/*.scss'])
		.pipe(compass({
            project: path.join(__dirname, './'),
			css: 'static/css',
			image: 'static/images',
			sass: 'static_src/scss',
            style: 'compressed',
            sourcemap: true
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(cssnano())
		.pipe(gulp.dest('static/css'));
});

gulp.task('scripts', function() {
	gulp.src(['static_src/js/lib/**/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('static/js'));
	return gulp.src('static_src/js/site/**/*.js')
		.pipe(concat('site.js'))
    	.pipe(sourcemaps.init())
		.pipe(gulp.dest('static/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
    	.pipe(sourcemaps.write())
		.pipe(gulp.dest('static/js'));
});
