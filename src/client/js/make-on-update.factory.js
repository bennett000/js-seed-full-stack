(function () {
    'use strict';

    /*global angular*/
    angular.module('MealCalories').factory('makeOnUpdate', factory);

    /**
     * @ngInject
     */
    function factory() {

        function makeUpdate(obj) {
            var updateListeners = Object.create(null);

            obj.onUpdate = onUpdate;
            obj.notify = notify;

            function notify(status) {
                Object.keys(updateListeners).forEach(function (id) {
                    updateListeners[id].call(null, status);
                });
            }

            /**
             * @param {function(...)} fn
             * @returns {function(...)}
             */
            function onUpdate(fn) {
                if (!angular.isFunction(fn)) {
                    return angular.noop;
                }
                var id = +Date.now().toString(16) + Math.random();
                updateListeners[id] = fn;
                function destroy() {
                    delete updateListeners[id];
                }
                return destroy;
            }

            return obj;
        }
        return makeUpdate;
    }

}());
