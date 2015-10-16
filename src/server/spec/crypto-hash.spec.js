'use strict';
/*global describe, it, expect, require*/

describe('Crypto Hash wraps credential', function () {
    var hash = require('../js/util/crypto-hash'),
        pass = 'test me I am secret';

    it('verify should fail if passwords mismatch', function (done) {
        hash.saltHash(pass).then(function (shash) {
            hash.verify(shash, 'something else').then(function () {
                expect('this case should not happen').toBeUndefined();
                done();
            }, function () {
                expect(true).toBe(true);
                done();
            });
        });
    });

    it('verify should succeed if passwords match', function (done) {
        hash.saltHash(pass).then(function (shash) {
            hash.verify(shash, pass).then(function (r) {
                expect(true).toBe(true);
                done();
            }, function (err) {
                expect(err).toBeUndefined();
                done();
            });
        });
    });

    it('verify should reject if credential errors', function (done) {
        hash.verify(pass, pass).then(function () {
            expect('this case should not happen').toBeUndefined();
            done();
        }, function () {
            expect(true).toBe(true);
            done();
        });
    });
});
