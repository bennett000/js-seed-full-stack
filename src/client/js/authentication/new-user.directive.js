/*global angular*/
(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcNewUser', mcNewUserDirective);

    /**
     * @ngInject
     * @param {$location} $location
     * @param {mcLogin} mcLogin
     * @param {users} users
     */
    function mcNewUserDirective($location, mcLogin, users) {

        function linkFn(scope) {
            scope.user = {
                username: '',
                password: '',
                passwordConfirm: '',
                authority: 'regular'
            };
            scope.result = {
                error: '',
                success: null
            };
            scope.newUser = function newUser(user) {
                mcLogin.newUser(user).then(function (result) {
                    if (result.error) {
                        resultError(result.error);
                    } else {
                        scope.result.error = '';
                        scope.result.success = 'User Created';
                        users.notify();
                        $location.path('/login');
                    }
                }, function (err) {
                    resultError(err.message);
                });
            };

            function resultError(err) {
                scope.result.error = err;
                scope.result.success = null;
            }
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            templateUrl: 'html/new-user.html'
        };
    }
}());
