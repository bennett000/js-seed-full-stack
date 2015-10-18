'use strict';
/*global describe, it, expect, require, beforeEach */

describe('Meals interface', function () {
    var meals = require('../js/meals'),
        testId = 'blah',
        testMeal1 = { userId: testId, text: 'lunch', timestamp: 5,
            calories: 30 };

    it('find should retrieved created meals',
        function (done) {
            meals.create(testId, testMeal1).then(function (r1) {
                return meals.find(r1.id).then(function (r) {
                    expect(r).toBeTruthy();
                    done();
                });
            }).fail(function (err) {
                expect(err).toBeUndefined();
                done();
            });
        });

});
