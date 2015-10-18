'use strict';

(function () {
    /*global angular*/
    angular.module('MealCalories').service('sessionStorage', sessionStorage);

    /**
     * @ngInject
     * @param {$q} $q
     * @param {$window} $window
     * @param {string} appPrefix
     */
    function sessionStorage($q, $window, appPrefix) {
        /*jshint validthis:true */
        this.set = setThing;
        this.get = getThing;
        this.remove = removeThing;

        /**
         * @param {*} input
         * @returns {string}
         */
        function stringify(input) {
            try {
                return JSON.stringify(input);
            } catch(err) {
                return err;
            }
        }

        /**
         * @param {string} str
         * @returns {*}
         */
        function parse(str) {
            try {
                return JSON.parse(str);
            } catch(err) {
                return err;
            }
        }

        /**
         * @param {string} key
         * @returns {string}
         */
        function prefixKey(key) {
            return appPrefix + '.' + key;
        }

        /**
         * @param {string} key
         * @param {any} val
         * @returns {$q.Promise}
         */
        function setThing(key, val) {
            var d = $q.defer(),
                stringVal = stringify(val);

            if (stringVal instanceof Error) {
                d.reject(stringVal);
            } else {
                $window.sessionStorage.setItem(prefixKey(key), stringVal);
                d.resolve();
            }
            return d.promise;
        }

        /**
         * @param {string} key
         * @returns {$q.Promise}
         */
        function getThing(key) {
            var d = $q.defer(),
                val = $window.sessionStorage.getItem(prefixKey(key));
            if (val === null) {
                d.reject(new Error('sessionStorage: ' + key + 'not found'));
                return d.promise;
            }
            val = parse(val);
            if (val instanceof Error) {
                d.reject(val);
            } else {
                d.resolve(val);
            }
            return d.promise;
        }

        /**
         * @param {string} key
         * @returns {$q.Promise}
         */
        function removeThing(key) {
            var d = $q.defer();
            $window.sessionStorage.removeItem(prefixKey(key));
            d.resolve();
            return d.promise;
        }
    }

}());
