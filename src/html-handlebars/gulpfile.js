const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const data = require('gulp-data')
const jsondata = require('./scripts/gulp-data-json')
const handlebars = require('gulp-compile-handlebars');

function hello(){
    console.log('Hello gulp !')
    return Promise.resolve()
}

function cleanCompile(){
    return del(['dist/**/*.html'])
}

function compile(){
    const options = {
        batch: ['src/partials']
    }
    return src('src/pages/*.html')
            .pipe(data(jsondata()))
            .pipe(handlebars(null, options))
            .pipe(dest('dist'))
}

function watchCompile(){
    watch(['src/pages/*.html', 'src/pages/*.json'], series(cleanCompile, compile))
}

exports.cleanCompile = cleanCompile
exports.compile = compile
exports.watchCompile = watchCompile
exports.default = hello
