const Route = require('../models/route.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const constants = require('../public/js/constants');

module.exports.list = (req, res, next) => {
    const filters = req.query;
    const { location, sport, difficulty } = req.query;
    const criterial = Object.keys(filters)
        .filter((key => filters[key] !== 'all'))
        .reduce((criterial, filter) => {
            if (filters[filter]) criterial[filter] = filters[filter];
            return criterial;
        }, {});

    Route.find(criterial)
        .then(routes => {
            console.log(filters)
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
    res.render('routes/detail', { route: req.route });
}

module.exports.edit = (req, res, next) => {
    const sports = constants.SPORTS;
    const difficulties = constants.DIFFICULTIES;
    res.render('routes/edit', { route: req.route, sports, difficulties });
}

module.exports.doEdit = (req, res, next) => {
    Object.assign(req.route, req.body);
    req.route.save()
        .then(route => res.redirect(`/route/${route.id}`))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('routes/edit', {
                    route: req.route,
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
        .then(() => res.redirect('/routes'))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.log(error)
                res.render('routes/new', {
                    errors: error.errors,
                    route,
                    sports: constants.SPORTS,
                    difficulties: constants.DIFFICULTIES
                })
            } else next(error);
        })
}

module.exports.delete = (req, res, next) => {
    Route.findByIdAndDelete(req.route.id)
        .then(() => res.redirect('/routes'))
        .catch(next)
}