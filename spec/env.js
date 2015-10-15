'use strict';

/*global module, require */
var serverConfig = require('../etc/config'),
    protocol = serverConfig.ssl && serverConfig.ssl.enabled ?
        'https://' : 'http://',
    port = serverConfig.port;

module.exports = {
    address: '127.0.0.1',
    port: port,
    protocol: protocol
};