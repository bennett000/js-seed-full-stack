/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mcUserStatus Directive', function () {
    'use strict';

    var $compile, $rootScope, loginResults = {};

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
            expect(el.text().trim()).toBe('Username Password Create New User');
        }));
});
