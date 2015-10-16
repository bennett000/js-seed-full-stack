'use strict';

/*global module, element, by, require, browser */
module.exports = Login;

var env = require('../env');

function Login() {
    /*jshint validthis:true */

    var username = element(by.model('user.username')),
        submit = element(by.id('mc-button-login')),
        error = element(by.className('mc-login-error')),
        password = element(by.model('user.password'));

    this.init = init;
    this.username = setUserName;
    this.password = setPassword;
    this.submit = clickSubmit;
    this.errorText = errorText;

    function init(){
       browser.get(env.url() + '#/login');
    }

    function errorText() {
        return error.getText();
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
}
