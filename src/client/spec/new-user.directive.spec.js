/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mcNewUser Directive', function () {
    'use strict';

    var $compile, $rootScope, newUserResults = {};

    beforeEach(function () {
        module('MealCalories');

        module(function ($provide) {
            $provide.service('mcLogin', function ($q) {
                this.newUser = function newUser() {
                    var d = $q.defer();
                    d.resolve(newUserResults);
                    return d.promise;
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
                toBe('User CreatedUsername Password Password');
        }));

    it('shows error text on an invalid user', inject(function () {
        newUserResults.error = true;
        var el = $compile('<mc-new-user></mc-new-user>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.newUser();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe('Username Password Password');
    }));

    it('hides error text on invalid user', inject(function () {
        newUserResults.error = true;
        var el = $compile('<mc-new-user></mc-new-user>')($rootScope);
        $rootScope.$digest(); // digest the compiled changes
        $rootScope.newUser();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).not.toBe('Username Password Password');
        delete newUserResults.error; // clear the error
        $rootScope.newUser();   // trigger the login
        $rootScope.$digest(); // digest the login's promise
        expect(el.text().trim()).toBe('User CreatedUsername Password Password');
    }));

});
