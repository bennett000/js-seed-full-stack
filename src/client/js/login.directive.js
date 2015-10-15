/*global angular*/
(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcLogin', mcLoginDirective);

    /**
     * @ngInject
     */
    function mcLoginDirective(mcLogin) {

        function linkFn(scope) {
            scope.user = {
                username: '',
                password: ''
            };
            scope.badLogin = {
                error: ''
            };
            scope.login = function login(user) {
                mcLogin.login(user).then(function (result) {
                    if (result.error) {
                        scope.badLogin.error = result.error;
                    } else {
                        scope.badLogin.error = '';
                    }
                });
            };
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            templateUrl: 'html/login.html'
        };
    }
}());
