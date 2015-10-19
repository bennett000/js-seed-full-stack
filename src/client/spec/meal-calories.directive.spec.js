/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mealCalorie Directive', function () {
    'use strict';

    var $compile, $rootScope;

    beforeEach(function () {
        module('MealCalories');

        module(function ($provide) {
            $provide.service('meals', function ($q, makeOnUpdate) {
                makeOnUpdate(this);
                this.meals = {};
            });
        });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));


    it('compiles',
        inject(function () {
            var el = $compile('<mc-main></mc-main>')($rootScope);
            $rootScope.$digest();
            expect(el.text()).toBe('');
        }));

});
