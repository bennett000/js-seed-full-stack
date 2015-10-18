'use strict';

(function () {
    /*global angular*/
    angular.module('MealCalories').service('meals', meals);

    /**
     * @ngInject
     * @param {$http} $http
     * @param {$log} $log
     * @param {makeOnUpdate} makeOnUpdate
     * @param {mcLogin} mcLogin
     */
    function meals($http, $log, mcLogin, makeOnUpdate) {
        /*jshint validthis:true */

        var that = makeOnUpdate(this);
        this.meals = {};
        this.save = save;
        mcLogin.onUpdate(update);
        update();

        function update() {
            that.meals = {};
            $http.get('/meals/').then(function (results) {
                if (Array.isArray(results.data)) {
                    results.data.forEach(function (val) {
                        that.meals[val.id] = val;
                    });
                    that.notify('update');
                } else {
                    $log.error('Meals: Unexpected Data');
                }
            });
        }

        function save(meal) {
            meal.timestamp = meal.timestamp.getTime();
            $http.put('/meals/new', meal).then(function (results) {
                meal.timestamp = new Date(meal.timestamp);
                update();
            });
        }
    }

}());
