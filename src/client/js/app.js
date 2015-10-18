'use strict';

(function () {
    /*global angular*/
    angular.module('MealCalories', [
        'ngRoute',
        'ngAria'
    ]).constant('appPrefix', 'mc').config(configRoutes).config(detect401);

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
     * @param {mcLogin} mcLogin
     * @param {$location} $location
     * @returns {$q.Promise}
     */
    function checkAuthorityManager($q, $location, mcLogin) {
        var d = $q.defer(),
            user = mcLogin.user();
        if (!user) {
            $location.path('/');
            d.reject(new Error('Not Logged In'));
            return d.promise;
        }
        if (user.authority === 'regular') {
            $location.path('/');
            d.reject(new Error('Not Auhtorized'));
            return d.promise;
        }
        d.resolve();
        return d.promise;
    }

    /**
     * @ngInject
     * @param {$routeProvider} $routeProvider
     */
    function configRoutes($routeProvider) {
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
            .when('/meals', {
                template: '<mc-user-status></mc-user-status>' +
                '<mc-meals></mc-meals>',
                resolve: {
                    initLogin: checkMcLoginInit
                }
            })
            .when('/users', {
                template: '<mc-user-status></mc-user-status>' +
                '<mc-users></mc-users>',
                resolve: {
                    initLogin: checkMcLoginInit,
                    initAuthorityManager: checkAuthorityManager
                }
            })
            .when('/user', {
                template: '<mc-user-status></mc-user-status>' +
                '<mc-user mc-id="currentUser.id"></mc-user>',
                controller: 'CurrentUser',
                resolve: {
                    initLogin: checkMcLoginInit,
                    initAuthorityManager: checkAuthorityManager
                }
            })
            .otherwise({
                template: '<mc-user-status></mc-user-status>Welcome',
                resolve: {
                    initLogin: checkMcLoginInit
                }
            });
    }

    /**
     * @ngInject
     * @param {$httpProvider} $httpProvider
     */
    function detect401($httpProvider) {
        $httpProvider.interceptors.push(interceptor);
    }

    /**
     * @ngInject
     * @param {$q} $q
     * @param {$location} $location
     * @returns {$q.promise}
     */
    function interceptor($q, $location) {
        function success(response) {
            return response;
        }
        function error(response) {
            if (+response.status === 401) {
                //AuthFactory.clearUser();
                $location.path('/login');
                return;
            }
            // otherwise
            return $q.reject(response);
        }
        function interceptResolve(promise) {
            return promise.then(success, error);
        }
        return interceptResolve;
    }
}());
