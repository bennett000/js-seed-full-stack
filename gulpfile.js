'use strict';

/*global require, __dirname */
var gulp = require('gulp'),
    packageJSON = require('./package'),
    config = require('./etc/config'),
    jshint = require('gulp-jshint'),
    jshintConfig = packageJSON.jshintConfig,
    jasmine = require('gulp-jasmine'),
    cover = require('gulp-coverage'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    protractor = require('gulp-protractor'),
    ejs = require('gulp-ejs'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    glob = require('glob'),
    mkdirp = require('mkdirp'),
    Karma = require('karma').Server,
    ejsFiles = ['./src/client/index.ejs'],
    scssFiles = ['./src/client/scss/**/*.scss'],
    clientLib = [
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.js'];

// Downloads the selenium webdriver
gulp.task('webdriver_update', protractor.webdriver_update);
gulp.task('webdriver_standalone', protractor.webdriver_standalone);
gulp.task('default', ['test-karma', 'build']);
gulp.task('build', ['test-unit', 'ejs', 'scss', 'uglify']);
gulp.task('hint', ['hint-client', 'hint-server']);
gulp.task('ejs', generateTemplates);
gulp.task('hint-client', hintClient);
gulp.task('hint-server', hintServer);
gulp.task('test', ['test-unit', 'test-e2e']);
gulp.task('test-unit', ['test-server', 'test-client']);
gulp.task('test-e2e', ['webdriver_update'], testE2e);
gulp.task('test-server', ['hint-server'], testJasmine);
gulp.task('test-client', ['hint-client', 'test-karma']);
gulp.task('uglify', uglifyClient);
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
            gutil.log('Error: ' + e.message);
            throw e;
        }).on('end', function () {
            app.kill();
        });
}

function uglifyClient() {
    mkdirp('./src/server/www/js');
    return gulp.src(clientLib.concat(['./src/client/js/**/*.js'])).
        pipe(concat('meal-calories.min.js')).
        pipe(uglify({
            preserveComments: {
                license: true
            }
        })).
        pipe(gulp.dest('./src/server/www/js/'));
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
    return hint('./src/server/**/*.js');
}

function hintClient() {
    return hint('./src/client/**/*.js');
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
        gutil.log('Karma Run Failed: ' + err.message);
        throw err;
    });

    server.on('run_complete', function (browsers, results) {
        if (results.failed) {
            throw new Error('Karma: Tests Failed');
        }
        gutil.log('Karma Run Complete: No Failures');
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
        gutil.log('Make debug HTML');
        files = clientLib.map(clientLocalizeFile).
            concat(files.map(localizeFile));
        gulp.src(ejsFiles).
            pipe(ejs({
                styles: ['./css/main.css'],
                scripts: files
            })).
            pipe(gulp.dest('./src/client/'));
        done();
    });

    gutil.log('Make server HTML');
    gulp.src(ejsFiles).
        pipe(ejs({
            styles: ['css/main.css'],
            scripts: ['js/meal-calories.min.js']
        })).
        pipe(gulp.dest('./src/server/www/'));
}

function watch() {
    watchSCSS();
    watchEJS();
}

function watchSCSS() {
    var scssw = gulp.watch(scssFiles, ['scss']);

    scssw.on('end', function () {
        gutil.log('Sass Watch: Complete');
    });
    scssw.on('error', function (err) {
        gutil.log('Sass Watch: Error: ', err);
    });
    scssw.on('nomatch', function () {
        gutil.log('Sass Watch: Nothing To Watch');
    });
}

function watchEJS() {
    var scssw = gulp.watch(ejsFiles, ['ejs']);

    scssw.on('end', function () {
        gutil.log('ejs Watch: Complete');
    });
    scssw.on('error', function (err) {
        gutil.log('ejs Watch: Error: ', err);
    });
    scssw.on('nomatch', function () {
        gutil.log('ejs Watch: Nothing To Watch');
    });
}

