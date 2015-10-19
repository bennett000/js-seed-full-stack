'use strict';

(function () {
    /*global angular*/
    angular.module('MealCalories').service('users', users);

    /**
     * @ngInject
     * @param {$http} $http
     * @param {$log} $log
     * @param {makeOnUpdate} makeOnUpdate
     * @param {mcLogin} mcLogin
     */
    function users($http, $log, mcLogin, makeOnUpdate) {
        /*jshint validthis:true */

        var that = makeOnUpdate(this);
        this.users = {};
        this.change = change;
        mcLogin.onUpdate(update);
        update();

        function update() {
            that.users = {};
            $http.get('/users/').then(function (results) {
                if (Array.isArray(results.data)) {
                    results.data.forEach(function (val) {
                        that.users[val.id] = val;
                    });
                    that.notify('update');
                } else {
                    $log.error('Users: Unexpected Data');
                }
            });
        }

        function change(user) {
            if (!user.id) {
                return;
            }
            var put = {
                id : user.id,
                username : user.id,
                expectedCalories: +user.expectedCalories
            };
            $http.put('/users/' + user.id, put);
        }
    }

}());
