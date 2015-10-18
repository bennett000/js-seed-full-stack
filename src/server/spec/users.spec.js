'use strict';
/*global describe, it, expect, require, beforeEach */

describe('Users interface', function () {
    var users = require('../js/users'),
        testUser1, testUser2;

    beforeEach(function () {
        testUser1 = {id: 'test', password: '123'};
        testUser2 = {id: 'test2', password: '1234'};
    });

    it('createUser should resolve a new user object *without* a password field',
        function (done) {
            users.create(testUser1).then(function (newU) {
                expect(testUser1.password).toBeUndefined();
                done();
            }, function (err) {
                expect(err).toBeUndefined();
                done();
            });
        });

    it('createUser should remove password field from original object',
        function (done) {
            users.create(testUser2).then(function () {
                expect(testUser2.password).toBeUndefined();
                done();
            }, function (err) {
                expect(err).toBeUndefined();
                done();
            });
        });

    it('createUser should reject with no password', function (done) {
        users.create({id: 'stuff'}).then(function () {
            expect('this case should not happen').toBeUndefined();
            done();
        }, function (err) {
            expect(true).toBe(true);
            done();
        });
    });

    it('createUser should reject with no id', function (done) {
        users.create({password: 'stuff'}).then(function () {
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
        users.create(testUser1).then(function () {
            expect('this case should not happen').toBeUndefined();
            done();
        }, function (err) {
            expect(true).toBe(true);
            done();
        });
    });

    it('find should resolve with a found user', function (done) {
        users.find(testUser1.id).then(function (found) {
            expect(found.id).toBe(testUser1.id);
            done();
        }, function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });
});
