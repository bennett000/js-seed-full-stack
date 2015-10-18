/*global describe, it, expect, spyOn, beforeEach, module, inject, afterEach */

describe('mcLogin Service - initial state', function () {
    'use strict';

    beforeEach(function () {
        module('MealCalories');
    });

    describe('no existing log in', function () {
        beforeEach(inject(function (sessionStorage){
            sessionStorage.remove('user');
        }));

        it('should start with a user from sessionStorage',
            inject(function (mcLogin, $rootScope) {
                mcLogin.initPromise.then(function () {
                });
                $rootScope.$apply();
                expect(mcLogin.user()).toBe(null);
            }));
    });

    describe('existing log in', function () {
        beforeEach(inject(function (sessionStorage, $rootScope) {
            sessionStorage.set('user', {id: 'blah'});
            $rootScope.$apply();
        }));

        afterEach(inject(function (sessionStorage){
            sessionStorage.remove('user');
        }));

        it('should start with a user from sessionStorage',
            inject(function (mcLogin, $rootScope) {
                mcLogin.initPromise.then(function () {
                });
                $rootScope.$apply();
                expect(mcLogin.user().id).toBe('blah');
            }));
    });


});

describe('mcLogin Service - login function', function () {
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

describe('mcLogin Service - new user function', function () {
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

    it('should return null if there is no current user',
        inject(function (mcLogin) {
            expect(mcLogin.user()).toBe(null);
        }));

    it('should return the current user', inject(function (mcLogin) {
        mcLogin.login({});
        $httpB.flush();
        expect(mcLogin.user().name).toBe('george');
    }));
});

describe('mcLogin Service - new user function', function () {
    'use strict';

    var $httpB, authReq;

    beforeEach(function () {
        module('MealCalories');
    });

    beforeEach(inject(function ($injector) {
        $httpB = $injector.get('$httpBackend');
        authReq = $httpB.when('PUT', '/users/blah').
            respond({name: 'george'});
    }));

    it('should have a promise returning newUser function',
        inject(function (mcLogin) {
            expect(mcLogin.newUser()).toBeTruthy();
        }));

    it('should resolve its promise on an HTTP 200x response *without* ' +
        'including an error attribute on its result object',
        inject(function (mcLogin) {
            var done = false;
            $httpB.expectPUT('/users/blah');
            mcLogin.newUser({
                username: 'blah', password: 'secret',
                passwordConfirm: 'secret'
            }).
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
            $httpB.expectPUT('/users/blah');
            mcLogin.newUser({
                username: 'blah', password: 'secret',
                passwordConfirm: 'secret'
            }).
                then(function (result) {
                    if (result.error) {
                        done = true;
                    }
                });
            $httpB.flush();
            expect(done).toBe(true);
        }));

    it('reject with a password mismatch',
        inject(function (mcLogin, $rootScope) {
            var done = false;
            mcLogin.newUser({
                username: 'blah', password: 'secret',
                passwordConfirm: 'secret1'
            }).then(function (result) {
            }, function () {
                done = true;
            });
            $rootScope.$apply();
            expect(done).toBe(true);
        }));

});

describe('mcLogin Service - logout', function () {
    'use strict';

    var $httpB, authReq;

    beforeEach(function () {
        module('MealCalories');
    });

    beforeEach(inject(function ($injector) {
        $httpB = $injector.get('$httpBackend');
        authReq = $httpB.when('GET', '/logout').
            respond({name: 'george'});
    }));

    it('logout should trigger a GET to /logout', inject(function (mcLogin) {
        $httpB.expectGET('/logout');
        mcLogin.logout();
    }));

    it('logout should change location to /login',
        inject(function (mcLogin, $location) {
            $httpB.expectGET('/logout');
            mcLogin.logout();
            $httpB.flush();
            expect(mcLogin.user()).toBe(null);
            expect($location.path()).toBe('/login');
        }));

});

describe('mcLogin Service - change password function', function () {
    'use strict';

    var $httpB, changeReq, authReq;

    beforeEach(function () {
        module('MealCalories');
    });

    beforeEach(inject(function ($injector) {
        $httpB = $injector.get('$httpBackend');
        changeReq = $httpB.when('PUT', '/users/blah/password').
            respond({id: 'blah'});
        authReq = $httpB.when('POST', '/login').
            respond({id: 'blah'});
    }));

    it('should have a promise returning changePassword function',
        inject(function (mcLogin) {
            expect(mcLogin.changePassword()).toBeTruthy();
        }));

    it('should resolve its promise on an HTTP 200x response *without* ' +
        'including an error attribute on its result object',
        inject(function (mcLogin) {
            var done = false;
            mcLogin.login({username: 'blah', password: 'secret'});
            $httpB.flush();
            $httpB.expectPUT('/users/blah/password');
            mcLogin.changePassword({
                username: 'blah', password: 'secret',
                passwordNew: 'secret1',
                passwordConfirm: 'secret1'
            }).
                then(function (result) {
                    if (!result.error) {
                        done = true;
                    }
                });
            $httpB.flush();
            expect(done).toBe(true);
        }));

    it('should resolve its promise on an HTTP 200x and change $location to "/"',
        inject(function (mcLogin, $location) {
            mcLogin.login({username: 'blah', password: 'secret'});
            $httpB.flush();
            $httpB.expectPUT('/users/blah/password');
            mcLogin.changePassword({
                username: 'blah', password: 'secret',
                passwordNew: 'secret1',
                passwordConfirm: 'secret1'
            }).
                then(function (result) {
                });
            $httpB.flush();
            expect($location.path()).toBe('/');
        }));

    it('should resolve its promise on an HTTP response outside of 200x,' +
        'and mark the result object\'s error attribute',
        inject(function (mcLogin) {
            var done = false;
            mcLogin.login({username: 'blah', password: 'secret'});
            $httpB.flush();
            changeReq.respond(401, '');
            $httpB.expectPUT('/users/blah/password');
            mcLogin.changePassword({
                username: 'blah', password: 'secret',
                passwordNew: 'secret1',
                passwordConfirm: 'secret1'
            }).
                then(function (result) {
                    if (result.error) {
                        done = true;
                    }
                });
            $httpB.flush();
            expect(done).toBe(true);
        }));

    it('should reject with a password mismatch',
        inject(function (mcLogin, $rootScope) {
            var done = false;
            mcLogin.changePassword({
                username: 'blah', password: 'secret',
                passwordNew: 'secret1',
                passwordConfirm: 'secret2'
            }).then(function () {
            }, function () {
                done = true;
            });
            $rootScope.$apply();
            expect(done).toBe(true);
        }));

});
