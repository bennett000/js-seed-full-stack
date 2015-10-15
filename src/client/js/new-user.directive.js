/*global angular*/
(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcNewUser', mcNewUserDirective);

    /**
     * @ngInject
     */
    function mcNewUserDirective(mcLogin) {

        function linkFn(scope) {
            scope.user = {
                username: '',
                password: '',
                passwordConfirm: ''
            };
            scope.result = {
                error: ''
            };
            scope.newUser = function newUser(user) {
                mcLogin.newUser(user).then(function (result) {
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
            templateUrl: 'html/new-user.html'
        };
    }
}());
