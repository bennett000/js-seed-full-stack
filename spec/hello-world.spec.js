'use strict';

/*global describe, it, browser, require, expect */
var env = require('./env');

describe('Hello World', function() {
    it('should have a title', function() {
        browser.get(env.url());

        expect(browser.getTitle()).toEqual('Calorie Counter');
    });
});