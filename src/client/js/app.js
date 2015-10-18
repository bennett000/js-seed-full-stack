'use strict';

(function () {
    /*global angular*/
    angular.module('MealCalories', [
        'ngRoute',
        'ngAria'
    ]).constant('appPrefix', 'mc').config(configRoutes);

    /**
     * @ngInject
     * @param {mcLogin} mcLogin
     * @returns {$q.Promise}
     */
    function checkMcLoginInit(mcLogin) {
        return mcLogin.initPromise;
    }

    /**
     * @ngInject
     * @param {$routeProvider} $routeProvider
     * @param {$locationProvider} $locationProvider
     */
    function configRoutes($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                template: '<mc-login></mc-login>',
                resolve: {
                    initLogin: checkMcLoginInit
                }
            })
            .when('/logout', {
                template: '<mc-logout></mc-logout>',
                resolve: {
                    initLogin: checkMcLoginInit
                }
            })
            .when('/sign-up', {
                template: '<mc-new-user></mc-new-user>',
                resolve: {
                    initLogin: checkMcLoginInit
                }
            })
            .when('/password', {
                template: '<mc-change-password></mc-change-password>',
                resolve: {
                    initLogin: checkMcLoginInit
                }
            })
            .otherwise({
                template: 'Welcome',
                resolve: {
                    initLogin: checkMcLoginInit
                }
            });
    }
}());
