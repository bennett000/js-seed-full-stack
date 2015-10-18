'use strict';
/*global describe, it, expect, require, beforeEach */

describe('Passwords interface', function () {
    var authorities = require('../js/authorities'),
        testId = 'blah', mgr = 'manager', reg = 'regular', admin = 'admin';

    it('find should retrieved created authorities, that have an "authority"',
        function (done) {
            authorities.create(testId, reg).then(function () {
                return authorities.find(testId).then(function (test) {
                    expect(test.authority).toBeTruthy();
                    done();
                });
            }).fail(function (err) {
                expect(err).toBeUndefined();
                done();
            });
        });

    it('create should default to regular authority', function (done) {
        var testId2 = 'hhhh';
        authorities.create(testId2).then(function () {
            return authorities.find(testId2).then(function (test) {
                expect(test.authority).toBe(reg);
                done();
            });
        }).fail(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it('change authorities should resolve if the id exists', function (done) {
        authorities.change(testId, mgr).then(function () {
            return authorities.find(testId).then(function (a) {
                expect(a.authority).toBe(mgr);
                done();
            });
        }, function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it('change authorities should reject if given an invalid id',
        function (done) {
            authorities.change('ooga', reg).then(function () {
                expect('this case should not happen').toBeUndefined();
                done();
            }, function (err) {
                expect(true).toBe(true);
                done();
            });

        });

});
