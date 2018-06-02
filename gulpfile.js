const gulp = require('gulp')
const hbs = require('gulp-hb')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sync = require('browser-sync')
const webpack = require('webpack')
const path = require('path')
const UglifyJs = require('uglifyjs-webpack-plugin')

const onError = function(error) {
	console.log(err.toString())
	this.emit('end')
}

const styles = () => {
	return gulp.src('./src/scss/*.scss')
		.pipe(plumber(onError))
		.pipe(sass({
			includePaths: ['src/scss'],
			precision: 8
		}))
		.pipe(postcss(autoprefixer))
		.pipe(gulp.dest('./build/css'))
}

const renderTpls = () => {
	return gulp.src('./src/templates/*.hbs')
		.pipe(plumber(onError))
		.pipe(hbs().partials('./src/templates/partials/**/*.hbs'))
		.pipe(rename({extname: '.html'}))
		.pipe(gulp.dest('./build'))
}

const scripts = (done) => {
	webpack({
		context: __dirname,
		entry: './src/js/index.js',
		devtool: 'cheap-module-eval-source-map',
		output: {
			path: path.resolve(__dirname, 'build/js'),
			filename: 'bundle.js'
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}]
		},
		plugins: [
			new UglifyJs({
				parallel: 4,
				sourceMap: true
			})
		]
	}).run(function(err, stats) {
		if (err) {
			onError(err)
		}

		done();
	})
}

const server = (done) => {
	sync.init({
		server: {
			baseDir: './build',
			index: 'index.html'
		},
		files: './build',
		ui: false
	})
}

const watchStyles = () => gulp.watch('./src/scss/**/*.scss', styles)
const watchTemplates = () => gulp.watch('./src/templates/**/*.hbs', renderTpls)
const watchScripts = () => gulp.watch('./src/js/**/*.js', scripts)

const watch = gulp.parallel(watchStyles, watchTemplates, watchScripts)

const build = gulp.parallel(renderTpls, styles, scripts)
const dev = gulp.series(build, gulp.parallel(watch, server))

module.exports = {
	styles,
	renderTpls,
	watchStyles,
	watchTemplates,
	watch,
	build,
	dev
}
