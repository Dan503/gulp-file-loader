var header = `
// This file is generated by gulp-auto-imports.
// Save this file into source control.
// You may rearrange the order of the imports however you like.
// You may NOT make any other alterations to this file.
`

module.exports = {
	format: '@import $path',
	fileName: 'auto-imports.sass',
	retainOrder: true,
	header: header,
}
