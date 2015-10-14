'use strict';
/*global describe, it, expect, require*/

describe('test getIpAddresses', function () {
    var getIpAddresses = require('../js/util/get-ip-addresses');

    it('should callback with an array', function (done) {
        getIpAddresses(function(err, results) {
            if (err) {
                expect(err).toBeFalsy();
                done();
            }
            expect(Array.isArray(results)).toBe(true);
            done();
        });
    });
});