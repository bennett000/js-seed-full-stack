/*global angular*/
(function() {
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

        function login(user) {
            return $http.post('/login', user).then(function (result) {
                return { data: result.data };
            }, function (response) {
                var error = '';
                if (response.status === 401) {
                    error = 'Invalid Login Username/Password';
                } else {
                    error = 'Possible Connection Problem, Error: ' +
                    response.status;
                }
                return { error: error };
            });
        }
    }

}());
