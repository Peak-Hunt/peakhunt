const Route = require('../models/route.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const constants = require('../public/js/constants');

module.exports.list = (req, res, next) => {
    const filters = {...req.query};
    if (filters['elevationGained']) minAndMaxQuery('elevationGained');
    if (filters['duration']) minAndMaxQuery('duration');
    if (filters['distance']) minAndMaxQuery('distance');

    function minAndMaxQuery (attribute) {
        if (filters[attribute].length > 0) {
            filters[attribute] = {
                $gte: filters[attribute][0] || 0,
                $lte: filters[attribute][1] || 1000000,
            }
        }
    }
    
    const criterial = Object.keys(filters)
        .filter((key => filters[key] !== 'All' && filters[key] !== 'all'))
        .reduce((criterial, filter) => {
            if (filters[filter]) criterial[filter] = filters[filter];
            return criterial;
        }, {});

    Route.find(criterial)
        .then(routes => {
            console.log(req.query)
            res.render('routes/list', {
                routes,
                form: req.query,
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
    req.body.location = { type: 'Point', coordinates: (req.body.location).split(',').map(x => +x)}
    const route = Object.assign(req.route, req.body);
    route.save()
        .then(route => res.redirect(`/route/${route.id}`))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.log(error)
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
    route.location = { type: 'Point', coordinates: (req.body.location).split(',').map(x => +x)}
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

module.exports.routesWithin = (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const radius = distance / 6378.1; //Radius of the Earth

    if (!lat || !lng) next(error); //TODO

    const routes = Route.find({ location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }})
    .then(routes => {
        console.log(req.query)
        res.render('routes/list', {
            routes,
            form: req.query,
            sportOptions: constants.SPORT_OPTIONS,
            difficultyOptions: constants.DIFFICULTY_OPTIONS
        })
    })
    .catch(next)
}