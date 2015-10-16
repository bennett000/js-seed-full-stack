/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('Change Password Directive', function () {
    'use strict';

    var $compile, $rootScope, changePassResults = {};

    beforeEach(function () {
        module('MealCalories');

        module(function ($provide) {
            $provide.service('mcLogin', function ($q) {
                this.changePassword = function changePassword() {
                    var d = $q.defer();
                    d.resolve(changePassResults);
                    return d.promise;
                };
            });
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        changePassResults = {};
    }));

    it('compiles', inject(function () {
            var el = $compile('<mc-change-password>' +
                '</mc-change-password>')($rootScope);
            $rootScope.$digest();
            expect(el.text().trim()).toBe('Password Password');
        }));

    it('shows error text on an invalid user', inject(function () {
        changePassResults.error = true;
        var el = $compile('<mc-change-password>' +
        '</mc-change-password>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.changePassword();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe('Password Password');
    }));

    it('hides error text on invalid user', inject(function () {
        changePassResults.error = true;
        var el = $compile('<mc-change-password>' +
        '</mc-change-password>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.changePassword();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe('Password Password');
        delete changePassResults.error; // clear the error
        $rootScope.changePassword();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).toBe('Password Password');
    }));

});
