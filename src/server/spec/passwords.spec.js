'use strict';
/*global describe, it, expect, require, beforeEach */

describe('Passwords interface', function () {
    var passwords = require('../js/passwords'),
        testId = 'blah', testPass1 = 'secret',
        testPass2 = 'secret1';

    it('find should retrieved created passwords, that have a "saltedHash"',
        function (done) {
            passwords.create(testId, testPass1).then(function () {
                return passwords.find(testId).then(function (testId) {
                    expect(testId.saltedHash).toBeTruthy();
                    expect(testId.saltedHash).not.toBe(testPass1);
                    done();
                });
            }).fail(function (err) {
                expect(err).toBeUndefined();
                done();
            });
        });

    it('change passwords should resolve if given a valid password, and a ' +
    'new password', function (done) {
        passwords.change(testId, testPass1, testPass2).then(function () {
            return passwords.verify(testId, testPass2).then(function () {
                expect(true).toBe(true);
                done();
            });
        }, function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it('change passwords should reject if given an invalid password',
        function (done) {
            passwords.change(testId, testPass1, testPass2).then(function () {
                return passwords.verify(testId, testPass2).then(function () {
                    expect('this case should not happen').toBeUndefined();
                    done();
                });
            }, function (err) {
                expect(true).toBe(true);
                done();
            });

    });

});
