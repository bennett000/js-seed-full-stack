'use strict';

/*global require, __dirname, module */

// sets up, and initializes authentication
var LocalStrategy = require('passport-local').Strategy,
    etc = __dirname + '/../../../etc/',
    config = require(etc + 'config'),
    passport = require('passport'),
    session = require('express-session'),
    hash = require('./util/crypto-hash'),
    LOGIN_PATH = '/#/login',
    users = require('./users');

module.exports.init = init;

function init(app) {
    app.get('/login', getLoginPage);
    app.use(session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true
    }));

    passport.use('login-local', new LocalStrategy(authLocal));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(serializeUser);

    passport.deserializeUser(deserializeUser);

    app.post('/login', authenticateUserEndpoint);
    app.post('/logout', logoutUser);
}

function authLocal(user, pass, done) {
    users.find(user).then(function (found) {
        return hash.verify(found.password, pass).then(function () {
            done(null, found);
        });
    }).fail(function () {
        done(null, false, {message: 'Invalid Login Credentials'});
    });

}

function authenticateUserEndpoint(req, res, next) {
    passport.authenticate('login-local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json(user.name);
        });
    })(req, res, next);
}

function logoutUser(req, res) {
    req.session.destroy(function () {
        res.redirect(LOGIN_PATH);
    });
}

function getLoginPage(req, res) {
    res.redirect(LOGIN_PATH);
}

function serializeUser(user, cb) {
    console.log('serialize user', user);
    cb(null, user.id);
}

function deserializeUser(email, cb) {
    console.log('deserialize user', email);
    cb(null, {});
}
