var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require("gulp-notify");

var less = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');

var cssDir = './css';
var scriptsDir = './scripts';
var buildDir = './build';
var cssFiles = cssDir + '/*.less';


function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}


function buildScript(file, watch) {
    var props = { entries: [scriptsDir + '/' + file], };
    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    bundler.transform(babelify, {presets: ['es2015', 'react']});
    function rebundle() {
        var stream = bundler.bundle({debug: true});
        return stream.on('error', handleErrors)
        .pipe(source(file))
        .pipe(gulp.dest(buildDir + '/'));
    }
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });
    return rebundle();
}


gulp.task('build', function() {
    return buildScript('main.js', false);
});

gulp.task('css', function() {
    return gulp.src(cssDir + '/style.less')
        .pipe(less())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest(buildDir));
});
gulp.task('csswatch', function () {
    gulp.watch(cssFiles, ['css']);
});


gulp.task('default', ['build', 'csswatch'], function() {
    return buildScript('main.js', true);
});
