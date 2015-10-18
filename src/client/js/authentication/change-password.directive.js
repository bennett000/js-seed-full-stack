/*global angular*/
(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').
        directive('mcChangePassword', mcChangePassword);

    /**
     * @ngInject
     */
    function mcChangePassword(mcLogin, $location, $timeout) {

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
            scope.changePassword = function changePassword(user) {
                mcLogin.changePassword(user).then(function (result) {
                    if (result.error) {
                        scope.result.error = result.error;
                        scope.result.success = null;
                    } else {
                        scope.result.error = '';
                        scope.result.success = 'Password Changed... ' +
                        'Logging Out...';
                        $timeout(function () {
                            $location.path('/logout');
                        }, 2500);
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
