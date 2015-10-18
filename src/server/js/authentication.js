'use strict';

/*global require, __dirname, module */

// sets up, and initializes authentication
var LocalStrategy = require('passport-local').Strategy,
    etc = __dirname + '/../../../etc/',
    config = require(etc + 'config'),
    passport = require('passport'),
    session = require('express-session'),
    users = require('./users'),
    passwords = require('./passwords');


module.exports = {
    init: init,
    endpoints: {
        login: authenticateUserEndpoint,
        logout: logoutUser
    }
};

function init(app) {
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
}

function authLocal(user, pass, done) {
    return passwords.verify(user, pass).then(function () {
        return users.find(user).then(function (found) {
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

function logoutUser(req, res, next) {
    req.session.destroy(function () {
        next(req, res);
    });
}

function serializeUser(user, cb) {
    console.log('serialize user', user);
    cb(null, user.id);
}

function deserializeUser(email, cb) {
    console.log('deserialize user', email);
    cb(null, {});
}
