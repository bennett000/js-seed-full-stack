'use strict';

/*global require, module*/

var users = Object.create(null),
    passwords = require('./passwords'),
    hash = require('./util/crypto-hash'),
    Q = require('q');

module.exports = {
    find: find,
    create: createUser,
    endpoints: {
        update: updateUserEndpoint,
        create: createUserEndpoint,
        password: changePassword
    }
};

/**
 * @param {{ id: string, password: string }} user
 * @returns {*}
 */
function validateCreateUser(user) {
    var d = Q.defer();
    if (!user || !user.id) {
        d.reject(new TypeError('createUser: Invalid User Id'));
        return d.promise;
    }
    if (!user.password) {
        d.reject(new TypeError('createUser: Invalid User Password'));
        return d.promise;
    }
    if (users[user.id]) {
        d.reject(new Error('createUser: User Exists'));
        return d.promise;
    }
    return null;
}

/**
 * @param {{ id: string, password: string }} user
 * @returns {Q.Promise}
 */
function createUser(user) {
    var d = validateCreateUser(user);
    if (d) {
        // if validation returns a promise it's invalid
        return d;
    } else {
        d = Q.defer();
    }
    passwords.create(user.id, user.password).then(function () {
        // kill off the password attribute
        delete user.password;
        // create a _new_ user object
        users[user.id] = {
            id: user.id
        };
        d.resolve(users[user.id]);
    });
    return d.promise;
}

/**
 * @param {string} id
 * @returns {Q.Promise}
 */
function find(id) {
    var d = Q.defer();
    if (users[id]) {
        d.resolve(users[id]);
    } else {
        d.reject(new Error('findUser: user not found'));
    }
    return d.promise;
}

function changePassword(req, res) {
    passwords.change(req.body.username,
        req.body.password, req.body.passwordNew).
        then(function () {
            console.log('200');
            res.sendStatus(200);
        }, function (err) {
            console.log(500, err);
            res.status(500).json({error: err.message});
        });
}

function createUserEndpoint(req, res) {
    createUser({
        id: req.body.username,
        password: req.body.password
    }).then(function (user) {
        res.json(user);
    }, function (err) {
        res.status(500).json({error: err.message});
    });
}

function updateUserEndpoint(req, res) {
}
