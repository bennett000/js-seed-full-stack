/*global angular*/
(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').service('mcLogin', LoginService);

    /**
     * Hashes a password to avoid clear text passwords _ever_ leaving the client
     * code. This is _not_ to be confused with actual cryptographically secure
     * hashing the _must_ be implemented in the server.
     *
     * @param {string} str
     * @returns {string}
     */
    function clientSideHash(str) {
        /*global Hashes*/
        return new Hashes.SHA256().b64(str);
    }

    /**
     * @ngInject
     * @param {$http} $http
     * @param {$q} $q
     * @param {$location} $location
     * @param {sessionStorage} sessionStorage
     */
    function LoginService($http, $q, $location, sessionStorage) {
        this.login = login;
        this.logout = logout;
        this.newUser = newUser;
        this.changePassword = changePassword;
        this.user = accessUser;
        this.onUpdate = onUpdate;

        var updateListeners = Object.create(null),
            loggedInUser = null, initDefer = $q.defer(),
            USER_KEY = 'user';

        this.initPromise = initDefer.promise;

        sessionStorage.get(USER_KEY).then(function (user) {
            loggedInUser = user;
            notify('login');
            initDefer.resolve();
        }, function () {
            initDefer.resolve();
        });

        function logout() {
            $http.get('/logout').then(function () {
                return sessionStorage.remove(USER_KEY).then(function () {
                    loggedInUser = null;
                    notify('logout');
                    $location.path('/login');
                });
            });
        }

        function accessUser() {
            return loggedInUser;
        }

        /**
         * @param {*} user
         * @returns {{ username: string, password: string,
         passwordNew: string= }}
         */
        function validateUser(user) {
            /*global Hashes*/
            user = user || {};
            var reqUser = {};
            reqUser.username = user.username;
            reqUser.password = clientSideHash(user.password);
            if (user.passwordNew) {
                reqUser.passwordNew = clientSideHash(user.passwordNew);
            }
            return reqUser;
        }

        /**
         * @param {{ username: string, password: string }} user
         * @returns {$q.promise}
         */
        function login(user) {
            user = validateUser(user);
            return $http.post('/login', user).then(function (result) {
                loggedInUser = result.data;
                notify('login');
                return sessionStorage.set(USER_KEY, loggedInUser).
                    then(function () {
                        $location.path('/');
                        return {data: loggedInUser};
                    });
            }, function (response) {
                var error = '';
                if (response.status === 401) {
                    error = 'Invalid Login Username/Password';
                } else {
                    error = 'Possible Connection Problem, Error: ' +
                    response.status;
                }
                return {error: error};
            });
        }

        /**
         * @param {{ username: string, password: string,
         * passwordConfirm: string }} user
         * @param {string=} field
         * @returns {$q.promise | null}
         */
        function confirmPassword(user, field) {
            field = field || 'password';
            user = user || {};
            if (user[field] === user.passwordConfirm) {
                return null;
            }
            var d = $q.defer();
            d.reject(new Error('Password Mismatch'));
            return d.promise;
        }

        /**
         * @param {{ username: string, password: string,
         * passwordConfirm: string }} user
         * @returns {$q.promise}
         */
        function newUser(user) {
            var promise = confirmPassword(user);
            if (promise) {
                return promise;
            }
            user = validateUser(user);
            return $http.put('/users/' + user.username, user).
                then(function (result) {
                    return {data: result.data};
                }, function (response) {
                    var error = response.data.error ||
                        'Unexpected Server Error';
                    return {error: error};
                });
        }

        /**
         * @param {{ username: string, password: string,
         * passwordNew: string, passwordConfirm: string }} user
         * @returns {$q.promise}
         */
        function changePassword(user) {
            var promise = confirmPassword(user, 'passwordNew'), d;
            if (promise) {
                return promise;
            }
            if (!loggedInUser) {
                d = $q.defer();
                d.reject(new Error('not logged in...'));
                return d.promise;
            }
            user = validateUser(user);
            user.username = loggedInUser.id;
            return $http.put('/users/' + user.username + '/password', user).
                then(function (result) {
                    return {data: result.data};
                }, function (response) {
                    var error = response;
                    if (response.data) {
                        error = response.data.error ||
                        'Unexpected Server Error';
                    }
                    return {error: error};
                });
        }

        function notify(status) {
            Object.keys(updateListeners).forEach(function (id) {
                updateListeners[id].call(null, status);
            });
        }

        /**
         * @param {function(...)} fn
         * @returns {function(...)}
         */
        function onUpdate(fn) {
            if (!angular.isFunction(fn)) {
                return angular.noop;
            }
            var id = +Date.now().toString(16) + Math.random();
            updateListeners[id] = fn;
            function destroy() {
                delete updateListeners[id];
            }
            return destroy;
        }
    }

}());
