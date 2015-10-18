(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcUser', userDirective);

    /**
     * @ngInject
     * @param {users} users
     */
    function userDirective(users) {

        function linkFn(scope) {
            scope.user = users.users[scope.mcId];
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            scope: {
                mcId: '='
            },
            templateUrl: 'html/user.html'
        };
    }

}());
