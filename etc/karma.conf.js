// Karma configuration
// Generated on Tue Feb 04 2014 21:57:25 GMT-0500 (EST)

/*global module*/
module.exports = function (config) {
    'use strict';

    config.set(
        {
            // export CHROME_BIN=/usr/bin/chromium-browser
            // base path, that will be used to resolve files and exclude
            basePath: '..',

            // frameworks to use
            frameworks: ['jasmine'],


            // list of files / patterns to load in the browser
            files: [
                'node_modules/jshashes/hashes.js',
                'node_modules/angular/angular.js',
                'node_modules/angular-route/angular-route.js',
                'node_modules/angular-aria/angular-aria.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'src/client/js/**/*.js',
                'src/client/html-js/**/*.js',

                'src/client/spec/mock*.js',
                'src/client/spec/*.spec.js'
            ],


            // list of files to exclude
            exclude: [
            ],


            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress', 'coverage'],


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,


            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera (has to be installed with `npm install karma-opera-launcher`)
            // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
            // - PhantomJS
            // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
            browsers: ['Firefox'], //, 'Chrome'], //, 'PhantomJS'],


            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,


            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: false,

            // coverage support
            // html directive testing support
            preprocessors: {
                'src/client/js/**/*.js': ['coverage']
                //'src/client/html/**/*.html': ['ng-html2js']
            }
            //ngHtml2JsPreprocessor: {
            //    // If your build process changes the path to your templates,
            //    // use stripPrefix and prependPrefix to adjust it.
            //    stripPrefix: 'src/client/',
            //
            //    // the name of the Angular module to create
            //    moduleName: 'MealCalories'
            //}
        });
};
