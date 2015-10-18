'use strict';
/*global module, require, process, __dirname */
var express = require('express'),
    fs = require('fs'),
    etc = __dirname + '/../../../etc/',
    config = require(etc + 'config'),
    getIps = require('./util/get-ip-addresses'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    authentication = require('./authentication'),
    ensureAuth = require('connect-ensure-login').ensureLoggedIn,
    users = require('./users'),
    startAttempts = 0,
    DEFAULT_PORT = 3000,
    DEFAULT_SSL_KEY_PATH = etc + 'ssl/server.key',
    DEFAULT_SSL_CERT_PATH = etc + 'ssl/server.crt',
    LOGIN_PATH = '/#/login',
    server,
    app = express();

module.exports = {
    start: start,
    kill: finish
};

app.set('view engine', 'ejs');
if (config.compression) {
    app.use(compression());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express['static']('./www'));

authentication.init(app);

app.get('/login', getLoginPage);
app.post('/login', authentication.endpoints.login);

app.put('/users/:id/password', [
    ensureAuth(LOGIN_PATH),     // ensure logged in
    users.endpoints.password    // changes passwords
]);

app.put('/users/:id', [
    createUser,               // create user if it does *not* exist
    ensureAuth(LOGIN_PATH),   // ensure logged in
    users.endpoints.update]); // update user

app.get('/logout', [
    ensureAuth(LOGIN_PATH),          // log out only if logged in
    authentication.endpoints.logout, // actually logout
    logout]);                        // redirect


start();

function getSSLOptions() {
    try {
        return {
            key: fs.readFileSync(config.ssl.key),
            cert: fs.readFileSync(config.ssl.cert)
        };
    } catch (err) {
        /*global console*/
        console.log('Error loading SSL certs: ', err.message);
        console.log('Using dev/debug SSL certs instead');
        console.log('If this is a production deployment, please stop');
        console.log('');
        if (startAttempts) {
            throw err;
        }
        config.ssl.key = DEFAULT_SSL_KEY_PATH;
        config.ssl.cert = DEFAULT_SSL_CERT_PATH;
        config.ssl.usingDefault = true;
        startAttempts += 1;
        return getSSLOptions();
    }
}

function getPort() {
    return config.port || DEFAULT_PORT;
}

function getSSL() {
    if (!config.ssl) {
        config.ssl = {};
    }
    if (!config.ssl.enabled) {
        config.ssl.enabled = false;
        return config.ssl;
    }
    config.ssl.enabled = true;
    if (!config.ssl.key) {
        config.ssl.key = DEFAULT_SSL_KEY_PATH;
        config.ssl.usingDefault = true;
    }
    if (!config.ssl.cert) {
        config.ssl.cert = DEFAULT_SSL_CERT_PATH;
        config.ssl.usingDefault = true;
    }
}

function createServer() {
    getSSL();

    var port = getPort(),
        protocol;

    if (config.ssl.enabled) {
        protocol = require('https');
        return protocol.createServer(getSSLOptions(), app).listen(port);
    }
    protocol = require('http');
    return protocol.createServer(app).listen(port);
}

function start() {
    /*global console*/
    getSSL();

    var port = getPort(),
        protocol = config.ssl.enabled ? 'https://' : 'http://';

    server = createServer();

    getIps(function (err, ips) {
        if (err) {
            console.log('Error getting local IP addresses', err.message);
            return;
        }
        ips.forEach(function (host) {
            var sslNotice = '';
            if (config.ssl.enabled) {
                sslNotice = '(encrypted)';
            } else {
                sslNotice = '(*not encrypted*)';
            }
            console.log('Meal Calories listening at %s%s:%s', protocol, host,
                port, sslNotice);
            if (config.ssl.usingDefault) {
                console.log('*NOTE* Using Default/Dev/Debug SSL Keys');
            }
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

function getLoginPage(req, res) {
    res.redirect(200, LOGIN_PATH);
}

function logout(req, res) {
    res.redirect(200, LOGIN_PATH);
}

function createUser(req, res, next) {
    users.find(req.body.username).then(function foundUser() {
        // handled elsewhere
        next(req, res);
    }, function () {
        users.endpoints.create(req, res);
    });
}
