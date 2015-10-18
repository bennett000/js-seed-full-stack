(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcMeal', mealDirective);

    /**
     * @ngInject
     * @param {meals} meals
     */
    function mealDirective(meals) {

        function linkFn(scope) {
            scope.save = save;

            function save(meal) {
                meals.save(meal);
            }
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            scope: {
                meal: '='
            },
            templateUrl: 'html/meal.html'
        };
    }

}());
