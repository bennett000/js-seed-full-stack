/*global describe, it, expect, spyOn, beforeEach, module, inject, afterEach */

describe('mcLogin Service', function () {
    'use strict';

    var $httpB, authReq;

    beforeEach(function () {
        module('MealCalories');
    });

    beforeEach(inject(function ($injector) {
        $httpB = $injector.get('$httpBackend');
        authReq = $httpB.when('POST', '/login').
            respond({name: 'george'});
    }));

    it('should have a promise returning login function',
        inject(function (mcLogin) {
            expect(mcLogin.login()).toBeTruthy();
        }));

    it('should resolve its promise on an HTTP 200x response *without* ' +
        'including an error attribute on its result object',
        inject(function (mcLogin) {
            var done = false;
            $httpB.expectPOST('/login');
            mcLogin.login({username: 'blah', password: 'secret'}).
                then(function (result) {
                    if (!result.error) {
                        done = true;
                    }
                });
            $httpB.flush();
            expect(done).toBe(true);
        }));

    it('should resolve its promise on an HTTP response outside of 200x,' +
        'and mark the result object\'s error attribute',
        inject(function (mcLogin) {
            var done = false;
            authReq.respond(401, '');
            $httpB.expectPOST('/login');
            mcLogin.login({username: 'blah', password: 'secret'}).
                then(function (result) {
                    if (result.error) {
                        done = true;
                    }
                });
            $httpB.flush();
            expect(done).toBe(true);
        }));

    it('should distinguish between 401 errors, and other errors',
        inject(function (mcLogin) {
            var error1 = 1, error2 = 2;
            authReq.respond(401, '');
            $httpB.expectPOST('/login');
            mcLogin.login({username: 'blah', password: 'secret'}).
                then(function (result) {
                    if (result.error) {
                        error1 = result.error;
                    }
                });
            $httpB.flush();
            authReq.respond(403, '');
            $httpB.expectPOST('/login');
            mcLogin.login({username: 'blah', password: 'secret'}).
                then(function (result) {
                    if (result.error) {
                        error2 = result.error;
                    }
                });
            $httpB.flush();
            expect(error1).not.toBe(error2);
        }));
});
