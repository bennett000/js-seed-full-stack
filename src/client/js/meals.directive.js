(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcMeals', mealsDirective);

    /**
     * @ngInject
     * @param {meals} meals
     * @param {mcLogin} mcLogin
     */
    function mealsDirective(meals, mcLogin) {

        function linkFn(scope) {
            var destroyUpdate = meals.onUpdate(update),
            now = Math.floor(Date.now() / 60000) * 60000;
            update();

            scope.$on('$destroy', destroyUpdate);
            scope.filter = filter;
            scope.startDate = new Date(0);
            scope.endDate = new Date(now + 10000);

            function update() {
                scope.meals = Object.keys(meals.meals).map(function (id) {
                    meals.meals[id].timestamp =
                        new Date(meals.meals[id].timestamp);
                    return meals.meals[id];
                });

                var user = mcLogin.user(),
                    now = Math.floor(+Date.now() / 60000) * 60000,
                    userId;
                if (user) {
                    userId = user.id;
                } else {
                    userId = 'nobody';
                }

                scope.meals.unshift({
                    id: 'new',
                    userId: userId,
                    text: 'New Meal',
                    timestamp: new Date(now),
                    calories: user.expectedCalories
                });
            }

            function filter() {
                var tstart = scope.startDate.getTime(),
                    tend = scope.endDate.getTime(), temp;

                if (tend < tstart) {
                    temp = scope.startDate;
                    scope.startDate = scope.endDate;
                    scope.endDate = temp;
                }

                scope.meals = Object.keys(meals.meals).map(function (id) {
                    if (meals.meals[id].timestamp < tstart) {
                        return null;
                    }
                    if (meals.meals[id].timestamp > tend) {
                        return null;
                    }
                    meals.meals[id].timestamp =
                        new Date(meals.meals[id].timestamp);
                    return meals.meals[id];
                }).filter(function (el){
                    return el;
                });

            }
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            templateUrl: 'html/meals.html'
        };
    }

}());
