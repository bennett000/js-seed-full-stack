(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcAuthSelect', authSelect);

    var allAuthorities = Object.freeze(['regular', 'manager', 'admin']),
        mgrAuthorities = Object.freeze(['regular', 'manager']),
        regAuthorities = Object.freeze(['regular']);

    /**
     * @ngInject
     * @param {mcLogin} mcLogin
     */
    function authSelect(mcLogin) {

        function linkFn(scope) {
            scope.currentUser = mcLogin.user();
            scope.authorities = regAuthorities;
            if (scope.currentUser) {
                if (scope.currentUser.authority === 'admin') {
                    scope.authorities = allAuthorities;
                } else if (scope.currentUser.authority === 'manager') {
                    scope.authorities = mgrAuthorities;
                } else {
                    scope.authorities = regAuthorities;
                }
            } else {
                scope.authorities = regAuthorities;
            }
        }

        return {
            restrict: 'E',
            replace: true,
            scope: {
                ngModel: '='
            },
            link: linkFn,
            templateUrl: 'html/auth-select.html'
        };
    }

}());
