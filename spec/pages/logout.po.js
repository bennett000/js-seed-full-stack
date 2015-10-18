'use strict';

/*global module, element, by, require, browser */
module.exports = Logout;

var env = require('../env');

function Logout() {
    /*jshint validthis:true */

    this.logout = logout;

    function logout() {
        browser.get(env.url() + '#/logout');
    }
}
