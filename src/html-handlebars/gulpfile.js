const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const data = require('gulp-data')
const jsondata = require('@loicpetitdev/gulp-data-json')
const handlebars = require('gulp-compile-handlebars')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass')

function hello(){
    console.log('Hello gulp !')
    return Promise.resolve()
}

function clearCompile(){
    return del(['dist/**/*.html'])
}

function compile(){
    const globalData = {
        debug: false,
        title: "Task Web App - HTML - Handlebars"
    }
    const options = {
        batch: ['src/partials']
    }
    return src('src/pages/*.html')
            .pipe(data(jsondata()))
            .pipe(handlebars(globalData, options))
            .pipe(dest('dist'))
}

function watchCompile(){
    watch(['src/pages/*.html', 'src/partials/*.html', 'src/pages/*.json'], series(clearCompile, compile))
}

function clearSass(){
    return del(['dist/**/*.css'])
}

function compileSass(){
    return src(['src/styles/*.scss', '!src/styles/all.scss', 'src/styles/**/*.css'])
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(dest('dist/styles'))
}

function compileAllSass(){
    return src(['src/styles/all.scss'])
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(dest('dist/styles'))
}

function watchSass(){
    watch(['src/styles/*.scss', 'src/styles/*.css'], series(clearSass, compileSass, compileAllSass))
}

function serve(){
    // comme on reagit a la regeneration sass, les fichiers sont supprimés puis recréés, d'où le watch event add
    // on ne rajoute pas le stream browserSync volontairement pour avoir une tâche indépendante qui ne surveille que le dossier dist
    browserSync.init({
        server: './dist',
        watch: true,
        watchEvents: ['add', 'change']
    })
}

function proxy(){
    // comme on reagit a la regeneration sass, les fichiers sont supprimés puis recréés, d'où le watch event add
    // proxy la web application dans docker en localhost
    browserSync.init({
        proxy: 'handlebars.task.webapps:4000',
        files: './dist/**/*',
        watchEvents: ['add', 'change']
    })
}

exports.clearCompile = clearCompile
exports.compile = series(clearCompile, compile)
exports.watchCompile = watchCompile
exports.clearSass = clearSass
exports.compileSass = series(clearSass, compileSass, compileAllSass)
exports.watchSass = watchSass
exports.watchAll = parallel(watchCompile, watchSass)
exports.serve = parallel(exports.watchAll, serve)
exports.proxy = parallel(exports.watchAll, proxy)
exports.default = hello
