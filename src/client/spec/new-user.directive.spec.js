/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mcNewUser Directive', function () {
    'use strict';

    var $compile, $rootScope, newUserResults = {},
        expectedText1 = 'Username Password Confirm Password',
        updatedText1 = 'User Created' + expectedText1, newUserFail = false;

    beforeEach(function () {
        module('MealCalories');

        newUserFail = false;

        module(function ($provide) {
            $provide.service('mcLogin', function ($q) {
                this.newUser = function newUser() {
                    var d = $q.defer();

                    if (newUserFail) {
                        d.reject(new Error(newUserFail));
                    } else {
                        d.resolve(newUserResults);
                    }
                    return d.promise;
                };
                this.user = function user() {
                    return {
                        id: 'blah',
                        authority: 'regular'
                    };
                };
            });
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        newUserResults = {};
    }));

    it('compiles', inject(function () {
            var el = $compile('<mc-new-user></mc-new-user>')($rootScope);
            $rootScope.$digest();
            expect(el.text().trim()).
                toBe(expectedText1);
        }));

    it('shows error text on an invalid user', inject(function () {
        newUserResults.error = 'some error';
        var el = $compile('<mc-new-user></mc-new-user>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.newUser();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe(expectedText1);
    }));

    it('hides error text on invalid user', inject(function () {
        newUserResults.error = 'some error';
        var el = $compile('<mc-new-user></mc-new-user>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.newUser();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe(expectedText1);
        delete newUserResults.error; // clear the error
        $rootScope.newUser();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).toBe(updatedText1);
    }));

    it('should clear the result object if newUser fails', inject(function () {
        newUserFail = 'test fail';
        var el = $compile('<mc-new-user></mc-new-user>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        expect($rootScope.result).toBeTruthy();
        $rootScope.result.success = 'booya';
        $rootScope.newUser();   // trigger the login
        $rootScope.$apply();
        expect($rootScope.result.success).toBeFalsy();
    }));

});
