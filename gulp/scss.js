
var gulp = require('gulp');
var sass = require('gulp-sass');

var fileLoader = require('../index');

var header = `
//- Do not edit this file.
//- Do not save this file in source control.
//- This file is generated by gulp-file-loader.
`;

gulp.task('sass', ['sass:load'], function(){
	return gulp.src('./test/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./test/css'));
});

gulp.task('sass:load', function(){

	var dest = 'test/scss';

	return gulp.src([
		'./test/scss/scss-input/**/*.scss',
		'./other-test-folder/scss/**/*.scss'
	])
		.pipe(fileLoader({
			format: '@import "$path";',
			dest: dest,
			fileName: 'file-loader.scss',
			retainOrder: true,
			header: header,
		}))
		.pipe(gulp.dest(dest))
})

gulp.task('sass:watch', function () {
  gulp.watch([
		'./test/scss/scss-input/**/*.scss',
		'./other-test-folder/scss/**/*.scss'
	], ['sass']);
});
