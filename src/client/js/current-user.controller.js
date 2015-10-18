(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').controller('CurrentUser', CurrentUser);

    /**
     * @ngInject
     * @param {$scope} $scope
     * @param {mcLogin} mcLogin
     */
    function CurrentUser($scope, mcLogin) {
        $scope.currentUser = mcLogin.user();
    }
}());
