'use strict';

(function () {
    /*global angular*/
    angular.module('MealCalories', ['ngRoute', 'ngAria']).config(configRoutes);

    /**
     * @ngInject
     * @param {$routeProvider} $routeProvider
     * @param {$locationProvider} $locationProvider
     */
    function configRoutes($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                template: '<mc-login></mc-login>'
            })
            .when('/sign-up', {
                template: '<mc-new-user></mc-new-user>'
            })
            .when('/password', {
                template: '<mc-change-password></mc-change-password>'
            })
            .otherwise({
                template: 'Welcome'
            });
    }
}());
