(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcUsers', usersDirective);

    /**
     * @ngInject
     * @param {users} users
     */
    function usersDirective(users) {

        function linkFn(scope) {
            var destroyUpdate = users.onUpdate(update);
            update();

            scope.$on('$destroy', destroyUpdate);
            function update() {
                scope.users = Object.keys(users.users).map(function (id) {
                    return users.users[id];
                });
            }
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            templateUrl: 'html/users.html'
        };
    }

}());
