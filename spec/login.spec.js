'use strict';

/*global describe, it, browser, require, expect, protractor, $ */

describe('Login, and Password Functions', function () {
    var Login = require('./pages/login.po.js'),
        Logout = require('./pages/logout.po.js'),
        SignUp = require('./pages/sign-up.po.js'),
        Change = require('./pages/change-password.po.js'),
        env = require('./env'),
        utils = require('./utils'),
        name1 = 'test', pass1 = 'secret', pass1_2 = 'secret1';

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
            name = name1, pass = pass1;

        signUp.init();
        signUp.username(name);
        signUp.password(pass);
        signUp.passwordConfirm(pass);
        signUp.submit();

        browser.wait(signUp.success, 5000);

        login.init();

        login.username(name);
        login.password(pass);
        login.submit();
        browser.wait(utils.urlChanged(env.url() + '/#/login'), 5000);
    });

    it('Should change passwords', function () {
        var change = new Change(),
            login = new Login();

        login.init();
        login.username(name1);
        login.password(pass1);
        login.submit();

        change.init();

        change.password(pass1);
        change.passwordNew(pass1_2);
        change.passwordConfirm(pass1_2);
        change.submit();

        browser.wait(change.success, 5000);
        expect(change.successText()).toBeTruthy();
    });

    //it('Should logout', function () {
    //    var login = new Login(),
    //        logout = new Logout(),
    //        name = name1, pass = pass1_2;
    //
    //    login.init();
    //
    //    login.username(name);
    //    login.password(pass);
    //    login.submit();
    //    expect(login.errorText()).toBeFalsy();
    //
    //});
});
