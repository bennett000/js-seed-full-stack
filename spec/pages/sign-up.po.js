'use strict';

/*global module, element, by, require, browser, protractor, $ */
module.exports = SignUp;

var env = require('../env');

function SignUp() {
    /*jshint validthis: true*/
    var username = element(by.model('user.username')),
        password = element(by.model('user.password')),
        submit = element(by.id('mc-button-sign-up')),
        passwordConfirm = element(by.model('user.passwordConfirm')),
    EC = protractor.ExpectedConditions;

    this.init = init;
    this.username = setUserName;
    this.password = setPassword;
    this.passwordConfirm = setPasswordConfirm;
    this.submit = clickSubmit;
    this.success = EC.textToBePresentInElement($('.mc-new-user-success'),
            'User Created');

    function init(){
        return browser.get(env.url() + '#/sign-up');
    }
    function clickSubmit() {
        submit.click();
    }

    function setUserName(name) {
        username.sendKeys(name);
    }

    function setPassword(pass) {
        password.sendKeys(pass);
    }

    function setPasswordConfirm(pass) {
        passwordConfirm.sendKeys(pass);
    }

}