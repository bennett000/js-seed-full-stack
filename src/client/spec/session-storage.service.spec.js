/*global describe, it, expect, spyOn, beforeEach, module, inject, afterEach */

describe('sessionStorage', function () {
    'use strict';

    beforeEach(function () {
        module('MealCalories');
    });

    it('should set values', inject(function (sessionStorage, $rootScope) {
        var val;
        sessionStorage.set('test', 'value').then(function () {
        });
        $rootScope.$apply();
        sessionStorage.get('test').then(function (result) {
            val = result;
        });
        $rootScope.$apply();
        expect(val).toBe('value');
    }));

    it('should remove values', inject(function (sessionStorage, $rootScope) {
        var val;
        sessionStorage.set('test', 'value').then(function () {
        });
        $rootScope.$apply();
        sessionStorage.get('test').then(function (result) {
            val = result;
        });
        $rootScope.$apply();
        expect(val).toBe('value');
        sessionStorage.remove('test');
        $rootScope.$apply();
        sessionStorage.get('test').then(function (result) {
        }, function () {
            val = 'expected';
        });
        $rootScope.$apply();
        expect(val).toBe('expected');
    }));

});

