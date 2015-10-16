/*global angular*/
(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').
        directive('mcChangePassword', mcChangePassword);

    /**
     * @ngInject
     */
    function mcChangePassword(mcLogin) {

        function linkFn(scope) {
            scope.user = {
                username: '',
                password: '',
                passwordConfirm: ''
            };
            scope.result = {
                error: ''
            };
            scope.changePassword = function newUser(user) {
                mcLogin.changePassword(user).then(function (result) {
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
            templateUrl: 'html/change-password.html'
        };
    }
}());
