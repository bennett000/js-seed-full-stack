'use strict';

/*global describe, it, browser, require, expect, protractor, $ */

describe('Login', function () {
    var Login = require('./pages/login.po.js'),
        SignUp = require('./pages/sign-up.po.js');

    it('Should fail to login with invalid credentials', function () {
        var login = new Login();

        login.init();

        expect(login.errorText()).toBeFalsy();
        login.username('something random');
        login.password('something else');
        login.submit();
        expect(login.errorText()).toBeTruthy();
    });

    it('Should succeed with valid credentials', function () {
        var login = new Login(),
            signUp = new SignUp(),
            name = 'test', pass = 'secret';

        signUp.init();
        signUp.username(name);
        signUp.password(pass);
        signUp.passwordConfirm(pass);
        signUp.submit();

        browser.wait(signUp.success, 2000);

        login.init();

        login.username(name);
        login.password(pass);
        login.submit();
        expect(login.errorText()).toBeFalsy();
    });
});
