/*global describe, it, expect, spyOn, beforeEach, module, inject */

describe('compare-to Directive', function () {
    'use strict';

    var $compile, $rootScope;

    beforeEach(function () {
        module('MealCalories');

    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    it('compiles', inject(function () {
        var scope = $rootScope.$new(),
            el = $compile('<div mc-compare-to="testModel1.name" ' +
            'ng-model="testModel2.name"></div>')(scope);
        scope.testModel1 = {
            name: 'you'
        };
        scope.testModel2 = {
            name: 'me'
        };
        $rootScope.$digest();
        expect(el.text().trim()).toBe('');
    }));

});
