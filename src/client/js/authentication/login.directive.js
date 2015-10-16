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
            scope.result = {
                error: ''
            };
            scope.login = function login(user) {
                mcLogin.login(user).then(function (result) {
                    if (result.error) {
                        scope.result.error = result.error;
                    } else {
                        scope.result.error = '';
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
