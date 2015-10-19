(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcMeals', mealsDirective);

    /**
     * @param {Date} val
     * @param {Date} start
     * @param {Date} end
     * @returns {boolean}
     */
    function betweenDates(val, start, end) {
        if (val.getTime() < start.getTime()) {
            return false;
        }
        if (val.getTime() > end.getTime()) {
            return false;
        }
        return true;
    }

    /**
     * @param {Date} val
     * @param {Date} start
     * @param {Date} end
     * @returns {boolean}
     */
    function betweenTimes(val, start, end) {
        if (val.getHours() < start.getHours()) {
            return false;
        }
        if (val.getHours() > end.getHours()) {
            return false;
        }
        if (val.getHours() === start.getHours()) {
            if (val.getMinutes() < start.getMinutes()) {
                return false;
            }
        }
        return true;
    }


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
            scope.filter = filter;
            scope.clearFilter = clearFilter;
            scope.user = {
                own: true,
                isSuper: false
            };
            clearFilter();

            function clearFilter() {
                if (mcLogin.user() && mcLogin.user().authority === 'regular') {
                    console.log('regular', mcLogin.user());
                    scope.user.isSuper = false;
                } else {
                    console.log('super', mcLogin.user());
                    scope.user.isSuper = true;
                }

                scope.startDate = null;
                scope.endDate = null;
                scope.startTime = null;
                scope.endTime = null;
                scope.invalid = {};
                scope.user.own = true;
                update();
            }

            function newMealRow() {
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

            function update() {
                scope.meals = Object.keys(meals.meals).map(function (id) {
                    if (doFilterOwn(meals.meals[id])) {
                        return null;
                    }
                    meals.meals[id].timestamp =
                        new Date(meals.meals[id].timestamp);
                    return meals.meals[id];
                }).filter(function (el) {
                    return el;
                });


                newMealRow();
            }

            function validateTimePairs(tstart, tend) {
                var valid = true;
                if (!(tstart && tend)) {
                    if (!tstart) {
                        scope.invalid.tstart = true;
                        valid = false;
                    } else {
                        scope.invalid.tstart = false;
                    }
                    if (!tend) {
                        scope.invalid.tend = true;
                        valid = false;
                    } else {
                        scope.invalid.tend = false;
                    }
                    return valid;
                }
                return valid;
            }

            /** @todo turn these into better directives */
            function validateDatePairs(dstart, dend) {
                var valid = true;
                if (!(dstart && dend)) {
                    if (!dstart) {
                        scope.invalid.dstart = true;
                        valid = false;
                    } else {
                        scope.invalid.dstart = false;
                    }
                    if (!dend) {
                        scope.invalid.dend = true;
                        valid = false;
                    } else {
                        scope.invalid.dend = false;
                    }
                    return valid;
                }
                return valid;
            }

            function validateTimes(tstart, tend) {
                var valid = true;
                if (tstart.getHours() > tend.getHours()) {
                    scope.invalid.tstart = true;
                    valid = false;
                } else {
                    scope.invalid.tstart = false;
                }
                if (tstart.getHours() === tend.getHours()) {
                    if (tstart.getMinutes() > tend.getMinutes()) {
                        scope.invalid.tstart = true;
                        valid = false;
                    } else {
                        scope.invalid.tstart = false;
                    }
                }
                return valid;
            }

            function validateDateTimePairs(dstart, dend, tstart, tend) {
                if (dstart || dend) {
                    if (!validateDatePairs(dstart, dend)) {
                        return false;
                    }
                }
                if (tstart || tend) {
                    if (!validateTimePairs(tstart, tend)) {
                        return false;
                    }
                }
                return true;
            }

            function validateDates(dstart, dend, tstart, tend) {
                var valid = true;
                if (!validateDateTimePairs(dstart, dend, tstart, tend)) {
                    return false;
                }
                if (!(!dstart && !dend)) {
                    if (dstart.getTime() > dend.getTime()) {
                        scope.invalid.dstart = true;
                        valid = false;
                    } else {
                        scope.invalid.dstart = false;
                    }

                }
                if (!(!tstart && !tend)) {
                    if (tstart && tend) {
                        if (!validateTimes(tstart, tend)) {
                            valid = false;
                        }
                    }
                }
                return valid;
            }

            function doFilterOwn(meal) {
                console.log('dfo');
                var user = mcLogin.user();
                if (!scope.user.own) {
                    console.log('dfo no own');
                    return false;
                }
                if (!user) {
                    return true;
                }
                if (user.id === meal.userId) {
                    console.log('dfo match');
                    return false;
                }
                return true;
            }

            function filter() {
                var dstart = scope.startDate,
                    dend = scope.endDate,
                    tstart = scope.startTime,
                    tend = scope.endTime;

                if (!validateDates(dstart, dend, tstart, tend)) {
                    return;
                }

                scope.invalid = {};
                scope.meals = Object.keys(meals.meals).map(function (id) {
                    if (doFilterOwn(meals.meals[id])) {
                        return null;
                    }
                    var d = new Date(meals.meals[id].timestamp);
                    if (dstart && dend) {
                        if (!betweenDates(d, dstart, dend)) {
                            return null;
                        }
                    }
                    if (tstart && tend) {
                        if (!betweenTimes(d, tstart, tend)) {
                            return null;
                        }
                    }

                    meals.meals[id].timestamp = d;
                    return meals.meals[id];
                }).filter(function (el) {
                    return el;
                });
                newMealRow();
            }
        }

        return {
            restrict: 'E',
            replace: true,
            scope: true,
            link: linkFn,
            templateUrl: 'html/meals.html'
        };
    }

}());
