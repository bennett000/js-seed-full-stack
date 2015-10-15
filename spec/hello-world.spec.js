'use strict';

/*global describe, it, browser, require, expect */
var env = require('./env');

describe('Hello World', function() {
    var address = env.protocol + env.address + ':' + env.port;
    it('should have a title', function() {
        browser.get(address);

        expect(browser.getTitle()).toEqual('Calorie Counter');
    });
});