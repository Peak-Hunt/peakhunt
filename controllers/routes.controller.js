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
                sportOptions: constants.SPORTS,
                difficultyOptions: constants.DIFFICULTIES
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
    const sportOptions = constants.SPORTS;
    const difficultyOptions = constants.DIFFICULTIES;
    Route.findById(req.params.id)
        .then(route => {
            res.render('routes/edit', { route, sportOptions, difficultyOptions });
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
                    sportOptions: constants.SPORTS,
                    difficultyOptions: constants.DIFFICULTIES,
                    errors: error.errors
                });
            } else next(error);
        });
}