'use strict';

/*global describe, it, browser, require, expect */
var testConfig = require('./config'),
    appConfig = require('../etc/config');

describe('Hello World', function() {
    var address = 'http://' + testConfig.address + ':' + appConfig.port;
    it('should have a title', function() {
        browser.get(address);

        expect(browser.getTitle()).toEqual('Calorie Counter');
    });
});