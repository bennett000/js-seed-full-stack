/*global module, require, process*/
module.exports = (function () {
    'use strict';

    var ignoreRE = /^(127\.0\.0\.1|::1|fe80(:1)?::1(%.*)?)$/i,
        exec = require('child_process').exec,
        cached,
        command,
        filterRE;

    switch (process.platform) {
        case 'win32':
            //case 'win64': // TODO: test
            command = 'ipconfig';
            filterRE = /\bIPv[46][^:\r\n]+:\s*([^\s]+)/g;
            break;
        case 'darwin':
            command = 'ifconfig';
            filterRE = /\binet\s+([^\s]+)/g;
            // filterRE = /\binet6\s+([^\s]+)/g; // IPv6
            break;
        default:
            command = 'ifconfig';
            filterRE = /\binet\b[^:]+:\s*([^\s]+)/g;
            // filterRE = /\binet6[^:]+:\s*([^\s]+)/g; // IPv6
            break;
    }

    /**
     * @param {function(Error|null, string[])} callback
     * @param bypassCache
     */
    function getAddresses (callback, bypassCache) {
        if (cached && !bypassCache) {
            callback(null, cached);
            return;
        }
        // system call
        exec(command, function (error, stdout) {
            cached = [];
            var ip,  matches = stdout.match(filterRE) || [], i;
            //if (!error) {
            for (i = 0; i < matches.length; i += 1) {
                ip = matches[i].replace(filterRE, '$1');
                if (!ignoreRE.test(ip)) {
                    cached.push(ip);
                }
            }
            //}
            callback(error, cached);
        });
    }

    return getAddresses;
}());

