/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mcLogout Directive', function () {
    'use strict';

    var $compile, $rootScope;

    beforeEach(function () {
        module('MealCalories');

        module(function ($provide) {
            $provide.service('mcLogin', function ($q) {
                this.logout = function logout() {
                    var d = $q.defer();
                    d.resolve();
                    return d.promise;
                };
            });
        });

    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('compiles',
        inject(function () {
            var el = $compile('<mc-logout></mc-logout>')($rootScope);
            $rootScope.$digest();
            expect(el.text()).toBe('Logging Out...');
        }));

});
