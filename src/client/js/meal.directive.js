(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcMeal', mealDirective);

    /**
     * @ngInject
     * @param {meals} meals
     * @param {mcLogin} mcLogin
     */
    function mealDirective(meals, mcLogin) {

        function linkFn(scope) {
            scope.save = save;
            scope.expectedCalories = mcLogin.user().expectedCalories;

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
