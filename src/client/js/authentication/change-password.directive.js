/*global angular*/
(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').
        directive('mcChangePassword', mcChangePassword);

    /**
     * @ngInject
     */
    function mcChangePassword(mcLogin, $location) {

        function linkFn(scope) {
            if (!mcLogin.user()) {
                $location.path('/login');
            }
            scope.user = {
                username: '',
                password: '',
                passwordNew: '',
                passwordConfirm: ''
            };
            scope.result = {
                error: '',
                success: null
            };
            scope.changePassword = function newUser(user) {
                mcLogin.changePassword(user).then(function (result) {
                    if (result.error) {
                        scope.result.error = result.error;
                        scope.result.success = null;
                    } else {
                        scope.result.error = '';
                        scope.result.success = 'Password Changed';
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
