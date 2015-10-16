'use strict';

/*global require, module*/

var users = Object.create(null),
    hash = require('./util/crypto-hash'),
    Q = require('q');

module.exports = {
    find: find,
    create: createUser
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
    hash.saltHashUser(user).then(function (newU) {
        users[newU.id] = newU;
        d.resolve(users[newU.id]);
    }, d.reject);
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
