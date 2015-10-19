(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcUser', userDirective);

    /**
     * @ngInject
     * @param {users} users
     * @param {mcLogin} mcLogin
     */
    function userDirective(users, mcLogin) {

        function linkFn(scope) {
            var destroy = users.onUpdate(update);

            scope.$on('$destroy', destroy);
            update();
            scope.save = save;

            if (mcLogin.user().authority !== 'regular') {
                scope.isSuper = true;
            }

            function update() {
                scope.user = users.users[scope.mcId];
            }

            function save(user) {
                users.change(user);
            }
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
