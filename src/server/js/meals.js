'use strict';

/*global require, module*/

var meals = Object.create(null),
    authorities = require('./authorities'),
    Q = require('q');

module.exports = {
    find: find,
    create: createMeal,
    change: changeMeal,
    endpoints: {
        get: getMeal,
        getAll: getAllMeals,
        update: changeEndpoint,
        create: createEndpoint
    }
};

/**
 * @param {{ id: string, userId: string, timestamp: number,
 text: string, calories: number}} meal
 * @return {{ id: string, userId: string, timestamp: number,
 text: string, calories: number}} meal
 */
function validateMeal(meal) {
    if (!meal.id) {
        return null;
    }
    if (!meal.userId) {
        return null;
    }
    meal.timestamp = +meal.timestamp;
    meal.text = meal.text || '';
    meal.calories = +meal.calories;
    return meal;
}

/**
 * @param {string} id
 * @return {Q.Promise}
 */
function find(id) {
    var d = Q.defer();
    if (meals[id]) {
        d.resolve(meals[id]);
    } else {
        d.reject(new Error('not found'));
    }
    return d.promise;
}

/**
 * @param {string} userId
 * @param {{ id: string, userId: string, timestamp: number,
 text: string, calories: number}} meal
 * @return {Q.Promise}
 */
function createMeal(userId, meal) {
    var id = +Date.now();
    id = id.toString(16) + Math.random();
    meal.id = id;
    meal.userId = userId;
    return find(id).then(function () {
        // invalid case
        return createMeal(userId, meal);
    }, function () {
        // expected case
        var m = validateMeal(meal);
        if (!m) {
            throw new Error('createMal: invalid meal');
        }
        meals[id] = m;
        return meals[id];
    });
}

function changeMeal_(id, meal) {
    var d = Q.defer(), m = validateMeal(meal);

    if (!m) {
        d.reject(new Error('changeMeal: invalid meal'));
    } else {
        meals[id] = m;
    }
    d.resolve(m);
    return d.promise;
}

/**
 * @param {string} userId
 * @param {{ id: string, userId: string, timestamp:number,
 text: string, calories: number}} meal
 * @return {Q.Promise}
 */
function changeMeal(userId, meal) {
    // change passwords
    return find(meal.id).then(function () {
        return changeMeal_(meal.id, meal);
    });
}

function getMeal(req, res) {
    var result;
    find(req.param.id).then(function (meal) {
        if (req.user.authority === authorities.ADM) {
            res.json(meal);
        } else {
            if (req.user.id === meal.userId) {
                res.json(meal);
            } else {
                res.sendStatus(401);
            }
        }
    }, function (err) {
        res.status(500).json({ error: err.message });
    });
}

function getAllMeals(req, res) {
    var result;
    if (req.user.authority === authorities.ADM) {
        result = Object.keys(meals).map(function (key) {
            return meals[key];
        });
    }
    if (req.user.authority === authorities.MGR) {
        result = Object.keys(meals).map(function (key) {
            return meals[key];
        }).filter(function (val) {
            return val;
        });
    }
    if (req.user.authority === authorities.REG) {
        result = Object.keys(meals).map(function (key) {
            if (meals[key].userId === req.user.id) {
                return meals[key];
            }
            return null;
        }).filter(function (val) {
            return val;
        });
    }
    res.json(result);
}

function changeEndpoint(req, res) {
    var id = req.body.id;
    if (!id || (id === 'new') || !meals[id]) {
        createEndpoint(req, res);
        return;
    }

    changeMeal(req.user.id, {
        id: id,
        userId: req.user.id,
        timestamp: req.body.timestamp || +Date.now(),
        text: req.body.text + '',
        calories: +req.body.calories
    }).then(function (meal) {
        res.json(meal);
    }, function (err) {
        res.status(500).json({error: err.message});
    });
}

function createEndpoint(req, res) {
    createMeal(req.user.id, {
        userId: req.user.id,
        timestamp: req.body.timestamp || +Date.now(),
        text: req.body.text + '',
        calories: +req.body.calories
    }).then(function (meal) {
        res.json(meal);
    }, function (err) {
        res.status(500).json({error: err.message});
    });
}
