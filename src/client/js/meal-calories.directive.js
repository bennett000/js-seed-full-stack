(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mealCalories', mealCalories);

    /**
     * ngInject
     */
    function mealCalories() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="mc-main">Hello World!</div>'
        };
    }
}());
