/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mcLogin Directive', function () {
    'use strict';

    var $compile, $rootScope, loginResults = {},
        expectedText1 = 'Username  Password  Create New User';

    beforeEach(function () {
        module('MealCalories');

        module(function ($provide) {
            $provide.service('mcLogin', function ($q) {
                this.login = function login() {
                    var d = $q.defer();
                    d.resolve(loginResults);
                    return d.promise;
                };
            });
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        loginResults = {};
    }));

    it('compiles', inject(function () {
            var el = $compile('<mc-login></mc-login>')($rootScope);
            $rootScope.$digest();
            expect(el.text().trim()).toBe(expectedText1);
        }));

    it('shows error text on an invalid login', inject(function () {
        loginResults.error = true;
        var el = $compile('<mc-login></mc-login>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.login();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe(expectedText1);
    }));

    it('hides error text on a valid login', inject(function () {
        loginResults.error = true;
        var el = $compile('<mc-login></mc-login>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.login();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe(expectedText1);
        delete loginResults.error; // clear the error
        $rootScope.login();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).toBe(expectedText1);
    }));

});
