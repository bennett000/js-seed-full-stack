'use strict';

/*global require, __dirname, module */

// sets up, and initializes authentication
var LocalStrategy = require('passport-local').Strategy,
    etc = __dirname + '/../../../etc/',
    config = require(etc + 'config'),
    passport = require('passport'),
    session = require('express-session'),
    users = {
        michael: {
            name: 'MJ Bennett',
            pass: 'test'
        }
    };

module.exports.init = init;

function init(app) {
    app.use(session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true
    }));

    passport.use('login-local', new LocalStrategy(authLocal));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        cb(null, user.name);
    });

    passport.deserializeUser(function (email, cb) {
        cb(null, {});
    });

    app.post('/login', authenticateUserEndpoint);
}

function authLocal(user, pass, done) {
    if ((users[user]) && (users[user].pass === pass)) {
        done(null, users[user]);
        return;
    }
    done(null, false, {message: 'Invalid Login Credentials'});
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
