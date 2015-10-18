(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcLogout', logoutDirective);

    /**
     * @ngInject
     * @param {mcLogin} mcLogin
     */
    function logoutDirective(mcLogin) {

        function linkFn() {
            mcLogin.logout();
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            template: '<div>Logging Out...</div>'
        };
    }

}());
