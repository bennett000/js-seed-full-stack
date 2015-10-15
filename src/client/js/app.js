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
            .otherwise({
                template: 'Welcome'
            });
    }
}());
