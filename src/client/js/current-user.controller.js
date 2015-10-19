(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').controller('CurrentUser', CurrentUser);

    /**
     * @ngInject
     * @param {$scope} $scope
     * @param {mcLogin} mcLogin
     * @param {users} users
     */
    function CurrentUser($scope, mcLogin, users) {
        $scope.currentUser = mcLogin.user();
        $scope.save = save;

        function save(user) {
            mcLogin.updateSessionUser(user);
            users.change(user);
        }
    }
}());
