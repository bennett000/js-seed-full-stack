/*global angular*/
(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcUserStatus', mcUserStatus);

    /**
     * @ngInject
     */
    function mcUserStatus(mcLogin) {
        function linkFn(scope) {
            var onUpdate;
            scope.user = null;

            mcLogin.init().then(update);
            onUpdate = mcLogin.onUpdate(update);
            scope.$on('$destory', destroy);

            function update() {
                scope.user = mcLogin.user();
            }
            function destroy() {
                onUpdate();
            }
        }

        return {
            restrict: 'E',
            replace: true,
            link:linkFn,
            templateUrl: 'html/user-status.html'
        };
    }
}());
