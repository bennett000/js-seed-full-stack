/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('mcUsers Directive', function () {
    'use strict';

    var $compile, $rootScope;

    beforeEach(function () {
        module('MealCalories');

        module(function ($provide) {
            $provide.service('users', function ($q, makeOnUpdate) {
                makeOnUpdate(this);
                this.users = [];
            });
        });

    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('compiles',
        inject(function () {
            var el = $compile('<mc-users></mc-users>')($rootScope);
            $rootScope.$digest();
            expect(el.text()).toBe('');
        }));

});
