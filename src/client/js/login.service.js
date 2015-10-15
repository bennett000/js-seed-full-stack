/*global angular*/
(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').service('mcLogin', LoginService);

    /**
     * @ngInject
     * @param {$http} $http
     * @param {$location} $location
     */
    function LoginService($http, $location) {
        this.login = login;
        this.newUser = newUser;

        function validateUser(user) {
            /*global Hashes*/
            user = user || {};
            user.password = new Hashes.SHA256().b64(user.password);
            return user;
        }

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

        function newUser(user) {
            user = validateUser(user);
            return $http.post('/users/' + user.username, user).
                then(function (result) {
                    return {data: result.data};
                }, function (response) {
                    var error = response.data.error || 'Unexpected Server Error';
                    return {error: error};
                });
        }
    }

}());
