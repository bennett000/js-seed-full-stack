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
        return new Hashes.SHA256().b64(str);
    }

    /**
     * @ngInject
     * @param {$http} $http
     * @param {$q} $q
     * @param {$location} $location
     */
    function LoginService($http, $q, $location) {
        this.login = login;
        this.newUser = newUser;
        this.changePassword = changePassword;

        /**
         * @param {*} user
         * @returns {{ username: string, password: string,
         passwordNew: string= }}
         */
        function validateUser(user) {
            /*global Hashes*/
            user = user || {};
            var reqUser = {};
            reqUser.username = user.username || 'nobody';
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
                return {data: result.data};
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
            var promise = confirmPassword(user, 'passwordNew');
            if (promise) {
                return promise;
            }
            user = validateUser(user);
            return $http.put('/users/' + user.username + '/password', user).
                then(function (result) {
                    return {data: result.data};
                }, function (response) {
                    var error = response.data.error ||
                        'Unexpected Server Error';
                    return {error: error};
                });
        }
    }

}());
