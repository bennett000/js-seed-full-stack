'use strict';
/*global module, require, process, __dirname */
var express = require('express'),
    config = require(__dirname + '/../../../etc/config'),
    getIps = require('./util/get-ip-addresses'),
    DEFAULT_PORT = 3000,
    server,
    app = express();

module.exports = {
    start: start,
    kill: finish
};

app.use(express.static('./www'));

start();

function start() {
    var port = config.port || DEFAULT_PORT;
    server = app.listen(port, function () {
        /*global console*/
        getIps(function (err, ips) {
            if (err) {
                console.log('Error getting local IP addresses', err.message);
                return;
            }
            ips.forEach(function (host) {
                console.log('Meal Calories listening at http://%s:%s', host,
                    port);
            });
        });
    });

}

function finish(status) {
    status = status || 0;
    process.exit(status);
    if (server) {
        return server.close();
    }
}

