
var gulp = require('gulp');
var fileLoader = require('../index');

var template = `
$format[imports]

export default function(){
$format[functions]
}
`;

gulp.task('js:load', function(){

	var dest = 'test/js';

	return gulp.src([
		'./test/js/js-input/**/*.js',
		'./other-test-folder/js/**/*.js'
	])
		.pipe(fileLoader({
			format: {
				imports: 'import $name from "$path";',
				functions: '  $name();'
			},
			//needed so that relative paths are able to be generated properly
			dest: dest,
			fileName: 'file-loader.js',
			retainOrder: true,
			template
		}))
		.pipe(gulp.dest(dest))
})

gulp.task('js', ['js:load']);

gulp.task('js:watch', function () {
  gulp.watch([
		'./test/js/js-input/**/*.js',
		'./other-test-folder/js/**/*.js'
	], ['js']);
});
