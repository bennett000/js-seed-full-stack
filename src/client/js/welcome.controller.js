(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').controller('Welcome', Welcome);

    /**
     * @ngInject
     * @param {$location} $location
     * @param {mcLogin} mcLogin
     */
    function Welcome($location, mcLogin) {
        if (mcLogin.user()) {
            $location.path('/meals');
        }
    }
}());
