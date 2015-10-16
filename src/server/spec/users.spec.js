'use strict';
/*global describe, it, expect, require, beforeEach */

describe('Users interface', function () {
    var users = require('../js/users'),
        testUser;

    beforeEach(function () {
        testUser = { id: 'test', password: '123'};
    });

    it('createUser should resolve with a hashed password', function (done) {
        var originalPass = testUser.password;
        users.create(testUser).then(function () {
            expect(testUser.password).not.toBe(originalPass);
            done();
        }, function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it('createUser should reject with no password', function (done) {
        users.create({ id: 'stuff' }).then(function () {
            expect('this case should not happen').toBeUndefined();
            done();
        }, function (err) {
            expect(true).toBe(true);
            done();
        });
    });

    it('createUser should reject with no id', function (done) {
        users.create({ password: 'stuff' }).then(function () {
            expect('this case should not happen').toBeUndefined();
            done();
        }, function (err) {
            expect(true).toBe(true);
            done();
        });
    });

    it('createUser should reject with no input', function (done) {
        users.create().then(function () {
            expect('this case should not happen').toBeUndefined();
            done();
        }, function (err) {
            expect(true).toBe(true);
            done();
        });
    });

    it('createUser should reject if it has the entry', function (done) {
        users.create(testUser).then(function () {
            expect('this case should not happen').toBeUndefined();
            done();
        }, function (err) {
            expect(true).toBe(true);
            done();
        });
    });

    it('find should resolve with a found user', function (done) {
        users.find(testUser.id).then(function (found) {
            expect(found.id).toBe(testUser.id);
            done();
        }, function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });
});
