'use strict';

/*global module, element, by, require, browser, protractor, $ */
module.exports = ChangePassword;

var env = require('../env');

function ChangePassword() {
    /*jshint validthis:true */
    var password = element(by.model('user.password')),
        submit = element(by.id('mc-button-change-pass')),
        success = element(by.className('mc-change-password-success')),
        passwordNew = element(by.model('user.passwordNew')),
        passwordConfirm = element(by.model('user.passwordConfirm')),
        EC = protractor.ExpectedConditions;

    this.init = init;
    this.password = setPassword;
    this.passwordNew = setPasswordNew;
    this.passwordConfirm = setPasswordConfirm;
    this.submit = clickSubmit;
    this.successText = successText;
    this.success = EC.textToBePresentInElement($('.mc-change-password-success'),
        'Password Changed');

    function init(){
        return browser.get(env.url() + '#/password');
    }

    function successText() {
        return success.getText();
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

    function setPasswordNew(pass) {
        passwordNew.sendKeys(pass);
    }
}
