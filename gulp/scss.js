var gulp = require('gulp')
var sass = require('gulp-sass')

var fileLoader = require('../index')

var header = `
// This file is generated by gulp-auto-imports.
// Save this file into source control.
// You may rearrange the order of the imports however you like.
// You may NOT make any other alterations to this file.
`

gulp.task('sass', ['sass:load'], function () {
	return gulp
		.src('./tests/test/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./tests/test/css'))
})

gulp.task('sass:load', function () {
	var dest = 'tests/test/scss'

	return gulp
		.src([
			'./tests/test/scss/variables/**/*.scss',
			'./tests/test/scss/mixins/**/*.scss',
			'./tests/test/scss/components/**/*.scss',
			'./tests/test/scss/pages/**/*.scss',
			'./tests/test/scss/scss-input/**/*.scss',
			'./tests/other-test-folder/scss/**/*.scss',
		])
		.pipe(
			fileLoader({
				format: '@import "$path";',
				dest: dest,
				fileName: 'auto-imports.scss',
				retainOrder: true,
				header: header,
			}),
		)
		.pipe(gulp.dest(dest))
})

gulp.task('sass:watch', function () {
	gulp.watch(
		[
			'./tests/test/scss/scss-input/**/*.scss',
			'./tests/other-test-folder/scss/**/*.scss',
		],
		['sass'],
	)
})

var sassDest = 'tests/multi-output-result'

function load_sass(folder) {
	var dest = sassDest + '/' + folder
	return gulp
		.src('./tests/test/scss/' + folder + '/**/*.scss')
		.pipe(
			fileLoader({ preset: 'scss', dest, fileName: 'test-output.scss' }),
		)
		.pipe(gulp.dest(dest))
}

var scssFolders = ['variables', 'mixins', 'components', 'pages']
var scssLoadTasks = scssFolders.map((folderName) => 'load:scss:' + folderName)

scssFolders.forEach((folderName, i) => {
	gulp.task(scssLoadTasks[i], function () {
		return load_sass(folderName)
	})
})

gulp.task('multi-output-test', scssLoadTasks)
