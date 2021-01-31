const Route = require('../models/route.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const constants = require('../public/js/constants');

module.exports.list = (req, res, next) => {
    const filters = req.query;
    const { location, sport, difficulty } = req.query;
    const criterial = Object.keys(filters)
        .filter((key => filters[key] !== 'All'))
        .reduce((criterial, filter) => {
            if (filters[filter]) criterial[filter] = filters[filter];
            return criterial;
        }, {});

    Route.find(criterial)
        .then(routes => {
            res.render('routes/list', {
                routes,
                location,
                sport,
                difficulty,
                sportOptions: constants.SPORT_OPTIONS,
                difficultyOptions: constants.DIFFICULTY_OPTIONS
            })
        })
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    Route.findById(id)
        .then(route => {
            res.render('routes/detail', { route });
        })
        .catch(next);
}

module.exports.edit = (req, res, next) => {
    const sports = constants.SPORTS;
    const difficulties = constants.DIFFICULTIES;
    Route.findById(req.params.id)
        .then(route => {
            res.render('routes/edit', { route, sports, difficulties });
        })
        .catch(next);
}

module.exports.doEdit = (req, res, next) => {
    Route.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true, useFindAndModify: false, new: true })
        .then(route => {
            if (route) {
                res.render('routes/detail', { route });
            } else {
                next(createError(404, 'This route does not exist'));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                const route = req.body;
                route.id = req.params.id;
                res.render('routes/edit', {
                    route,
                    sports: constants.SPORTS,
                    difficulties: constants.DIFFICULTIES,
                    errors: error.errors
                });
            } else next(error);
        });
}

module.exports.create = (req, res, next) => {
    res.render('routes/new', {
        sports: constants.SPORTS,
        difficulties: constants.DIFFICULTIES,
    });
}

module.exports.doCreate = (req, res, next) => {
    const route = req.body;
    Route.create(route)
        .then(route => {
            console.log(route);
            res.render('routes/detail', { route });
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('routes/new', {
                    errors: error.errors,
                    route
                })
            } else next(error);
        })
}

module.exports.delete = (req, res, next) => {
    Route.findByIdAndDelete(req.params.id)
        .then(route => {
            if (route) res.redirect('/routes');
            else next(createError(404, 'Route does not exist.'));
        })
        .catch(next)
}