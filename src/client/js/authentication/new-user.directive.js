/*global angular*/
(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcNewUser', mcNewUserDirective);

    var allAuthorities = Object.freeze(['regular', 'manager', 'admin']),
        mgrAuthorities = Object.freeze(['regular', 'manager']),
        regAuthorities = Object.freeze(['regular']);

    /**
     * @ngInject
     */
    function mcNewUserDirective(mcLogin) {

        function linkFn(scope) {
            scope.currentUser = mcLogin.user();
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
            if (scope.currentUser) {
                if (scope.currentUser.authority === 'admin') {
                    scope.authorities = allAuthorities;
                } else {
                    scope.authorities = mgrAuthorities;
                }
            } else {
                scope.authorities = regAuthorities;
            }
            scope.newUser = function newUser(user) {
                mcLogin.newUser(user).then(function (result) {
                    if (result.error) {
                        resultError(result.error);
                    } else {
                        scope.result.error = '';
                        scope.result.success = 'User Created';
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
