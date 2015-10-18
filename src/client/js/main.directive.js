(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcMain', mcMain);

    /**
     * @ngInject
     */
    function mcMain() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="mc-main" ng-view=""></div>'
        };
    }
}());
