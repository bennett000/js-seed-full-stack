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
            var destroyUpdate = meals.onUpdate(update);
            update();

            scope.$on('$destroy', destroyUpdate);
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
        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            templateUrl: 'html/meals.html'
        };
    }

}());
