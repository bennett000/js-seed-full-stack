'use strict';

/*global module, element, by, require, browser */
module.exports = ChangePassword;

var env = require('../env');

function ChangePassword() {
    /*jshint validthis:true */
    var password = element(by.model('user.password')),
        submit = element(by.id('mc-button-change-pass')),
        passwordConfirm = element(by.model('user.passwordConfirm'));

    this.init = init;
    this.password = setPassword;
    this.passwordConfirm = setPasswordConfirm;
    this.submit = clickSubmit;

    function init(){
        return browser.get(env.url() + '#/password');
    }

    function clickSubmit() {
        submit.click();
    }

    function setPassword(pass) {
        password.sendKeys(pass);
    }

    function setPasswordConfirm(pass) {
        passwordConfirm.sendKeys(pass);
    }
}
