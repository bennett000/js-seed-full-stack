/*global angular*/
(function() {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').directive('mcCompareTo', mcCompareTo);

    /**
     * @ngInject
     */
    function mcCompareTo() {

        function linkFn(scope, el, attr, ngModel) {
            ngModel.$validators.mcCompareTo = function(modelValue) {
                return modelValue === scope.compareTo;
            };

            scope.$watch('compareTo', function() {
                ngModel.$validate();
            });
        }

        return {
            require: 'ngModel',
            scope: {
                compareTo: '=mcCompareTo'
            },
            link: linkFn
        };
    }
}());
