/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mcUser Directive', function () {
    'use strict';

    var $compile, $rootScope;

    beforeEach(function () {
        module('MealCalories');

        module(function ($provide) {
            $provide.service('users', function ($q) {
                this.users = {};
            });
        });

    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('compiles',
        inject(function () {
            var el = $compile('<mc-user></mc-user>')($rootScope);
            $rootScope.$digest();
            expect(el.text()).toBe('');
        }));

});
