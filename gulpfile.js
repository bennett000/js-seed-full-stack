'use strict';

/*global require, __dirname */
var gulp = require('gulp'),
    gulpMerge = require('gulp-merge'),
    gulpUtil = require('gulp-util'),
    /** CHANGE CC_PATH to point to system's copy of closure compiler */
    CC_PATH = '/usr/local/lib/closure-compiler/build/compiler.jar',
    /** */
    packageJSON = require('./package'),
    config = require('./etc/config'),
    jshint = require('gulp-jshint'),
    jshintConfig = packageJSON.jshintConfig,
    jasmine = require('gulp-jasmine'),
    cover = require('gulp-coverage'),
    cc = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    minifyHtml = require('gulp-minify-html'),
    ngHtml2Js = require('gulp-ng-html2js'),
    protractor = require('gulp-protractor'),
    ejs = require('gulp-ejs'),
    sass = require('gulp-sass'),
    glob = require('glob'),
    mkdirp = require('mkdirp'),
    Karma = require('karma').Server,
    ejsFiles = ['./src/client/index.ejs'],
    htmlFiles = ['./src/client/html/**/*.html'],
    scssFiles = ['./src/client/scss/**/*.scss'],
    partialsFileName = 'partials-generated.js',
    clientLibUgly = [
        './node_modules/jshashes/hashes.min.js'
    ],
    clientLib = [
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.js',
        './node_modules/angular-aria/angular-aria.js'
    ];

// Downloads the selenium webdriver
gulp.task('webdriver_update', protractor.webdriver_update);
gulp.task('webdriver_standalone', protractor.webdriver_standalone);
gulp.task('default', ['test-karma', 'build']);
gulp.task('build', ['test-unit', 'ejs', 'scss', 'minify']);
gulp.task('bundle-html', bundleHTML);
gulp.task('hint', ['hint-client', 'hint-server']);
gulp.task('ejs', generateTemplates);
gulp.task('hint-client', ['hint-client-spec'], hintClient);
gulp.task('hint-server', ['hint-server-spec'], hintServer);
gulp.task('hint-client-spec', hintClientSpec);
gulp.task('hint-server-spec', hintServerSpec);
gulp.task('test', ['test-unit']);
gulp.task('test-unit', ['test-server', 'test-client']);
gulp.task('test-e2e', ['webdriver_update'], testE2e);
gulp.task('test-server', ['hint-server', 'test-jasmine']);
gulp.task('test-client', ['hint-client', 'test-karma']);
gulp.task('minify', ['bundle-html'], minifyClient);
gulp.task('test-jasmine', testJasmine);
gulp.task('test-karma', testKarma);
gulp.task('watch', watch);
gulp.task('scss', scss);

function testE2e() {
    var app = require('./src/server/js/server');

    return gulp.src(['./spec/*.spec.js'])
        .pipe(protractor.protractor({
            configFile: './etc/protractor.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:' + config.port]
        }))
        .on('error', function (e) {
            gulpUtil.log('Error: ' + e.message);
            throw e;
        }).on('end', function () {
            app.kill();
        });
}

function minifyClient() {
    mkdirp('./src/server/www/js');
    var ccStream = gulp.src(
        clientLib.concat([
            './src/client/js/**/*.js',
            './src/client/html-js/' + partialsFileName])
    ).
        pipe(cc({
            compilerPath: CC_PATH,
            fileName: 'meal-calories.min.js',
            compilerFlags: {
                compilation_level: 'SIMPLE_OPTIMIZATIONS',
                create_source_map: './src/server/www/js/' +
                'meal-calories.min.js.map',
                //# sourceMappingURL=meal-calories.min.js.map
                language_in: 'ECMASCRIPT5_STRICT',
                angular_pass: true,
                jscomp_off: 'misplacedTypeAnnotation'
            }
        })),
        uglyStream = gulp.src(clientLibUgly);

    return gulpMerge(uglyStream, ccStream).
        pipe(concat('meal-calories.min.js')).
        pipe(gulp.dest('src/server/www/js/'));
}

function scss() {
    mkdirp('./src/client/css');
    mkdirp('./src/server/www/css');
    return gulp.src(scssFiles).
        pipe(sass().on('error', sass.logError)).
        pipe(gulp.dest('./src/client/css')).
        pipe(gulp.dest('./src/server/www/css'));
}

function hint(path) {
    return gulp.src(path).
        pipe(jshint(jshintConfig)).
        pipe(jshint.reporter('default'));
}

function hintServer() {
    return hint('./src/server/js/**/*.js');
}

function hintServerSpec() {
    return hint('./src/server/spec/**/*.js');
}

function hintClient() {
    return hint('./src/client/js/**/*.js');
}

function hintClientSpec() {
    return hint('./src/client/spec/**/*.js');
}


function testJasmine() {
    return gulp.src('./src/server/spec/**/*.js').
        pipe(cover.instrument({
            pattern: ['./src/server/js/**/*.js'],
            debugDirectory: 'debug'
        })).
        pipe(jasmine()).
        pipe(cover.gather()).
        pipe(cover.format()).
        pipe(gulp.dest('coverage/server'));
}

function testKarma(done) {
    var server = new Karma({
        configFile: __dirname + '/etc/karma.conf.js',
        singleRun: true
    });

    server.on('browser_error', function (browser, err) {
        gulpUtil.log('Karma Run Failed: ' + err.message);
        throw err;
    });

    server.on('run_complete', function (browsers, results) {
        if (results.failed) {
            throw new Error('Karma: Tests Failed');
        }
        gulpUtil.log('Karma Run Complete: No Failures');
        done();
    });

    server.start();
}

function localizeFile(fileName) {
    fileName = fileName.split('/');
    fileName.shift();
    fileName.shift();
    fileName.shift();
    return fileName.join('/');
}

function clientLocalizeFile(fileName) {
    return '../.' + fileName;
}

function generateTemplates(done) {
    glob('./src/client/js/**/*.js', {}, function (er, files) {
        gulpUtil.log('Make debug HTML');
        files = clientLib.map(clientLocalizeFile).
            concat(clientLibUgly.map(clientLocalizeFile)).
            concat(files.map(localizeFile));
        gulp.src(ejsFiles).
            pipe(ejs({
                styles: ['./css/main.css'],
                scripts: files
            })).
            pipe(gulp.dest('./src/client/'));
        done();
    });

    gulpUtil.log('Make server HTML');
    gulp.src(ejsFiles).
        pipe(ejs({
            styles: ['css/main.css'],
            scripts: ['js/meal-calories.min.js']
        })).
        pipe(gulp.dest('./src/server/www/'));
}

function bundleHTML() {
    gulp.src(htmlFiles).
        pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        })).
        pipe(ngHtml2Js({
            moduleName: 'MealCalories',
            prefix: 'html/'
        })).
        pipe(concat(partialsFileName)).
        pipe(gulp.dest('./src/client/html-js/'));
}

function watch() {
    watchSCSS();
    watchEJS();
    watchHTML();
}

function watchHTML() {
    var scssw = gulp.watch(htmlFiles, ['bundle-html']);

    scssw.on('end', function () {
        gulpUtil.log('HTML Watch: Complete');
    });
    scssw.on('error', function (err) {
        gulpUtil.log('HTML Watch: Error: ', err);
    });
    scssw.on('nomatch', function () {
        gulpUtil.log('HTML Watch: Nothing To Watch');
    });
}

function watchSCSS() {
    var scssw = gulp.watch(scssFiles, ['scss']);

    scssw.on('end', function () {
        gulpUtil.log('Sass Watch: Complete');
    });
    scssw.on('error', function (err) {
        gulpUtil.log('Sass Watch: Error: ', err);
    });
    scssw.on('nomatch', function () {
        gulpUtil.log('Sass Watch: Nothing To Watch');
    });
}

function watchEJS() {
    var scssw = gulp.watch(ejsFiles, ['ejs']);

    scssw.on('end', function () {
        gulpUtil.log('ejs Watch: Complete');
    });
    scssw.on('error', function (err) {
        gulpUtil.log('ejs Watch: Error: ', err);
    });
    scssw.on('nomatch', function () {
        gulpUtil.log('ejs Watch: Nothing To Watch');
    });
}

