const Route = require('../models/route.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
const constants = require('../public/js/constants');

module.exports.list = async (req, res, next) => {
    const { location, distanceFromLocation, locationAddress } = req.query;
    let lng, lat;
    if (location) [lng, lat] = location.split(',');
    const radius = distanceFromLocation / 6378.1; // Radius of the Earth

    const page = parseInt(req.query.page);
    delete req.query.page;
    const limit = 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filters = { ...req.query };
    delete filters.distanceFromLocation;
    if (filters['elevationGained']) minAndMaxQuery('elevationGained');
    if (filters['duration']) minAndMaxQuery('duration');
    if (filters['distance']) minAndMaxQuery('distance');

    function minAndMaxQuery(attribute) {
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
    
    const pagination = {};
    if (endIndex < await Route.countDocuments().exec()) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit
        }
    }

    if (locationAddress) delete criterial.locationAddress;

    if (location && radius) criterial.location = { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    console.log(criterial)
    const routes = await Route.find(criterial).limit(limit).skip(startIndex).exec()
        .then(routes => {
            console.log(pagination)
            res.render('routes/list', {
                routes,
                form: req.query,
                pagination,
                sportOptions: constants.SPORT_OPTIONS,
                difficultyOptions: constants.DIFFICULTY_OPTIONS,
                withinOptions: constants.DISTANCES_WITHIN_OPTIONS,
            })
        })
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    console.log(req.route)

    res.render('routes/detail', { route: req.route });

}

module.exports.edit = (req, res, next) => {
    const sports = constants.SPORTS;
    const difficulties = constants.DIFFICULTIES;
    res.render('routes/edit', { route: req.route, sports, difficulties });
}

module.exports.doEdit = (req, res, next) => {
    req.body.location = { type: 'Point', coordinates: (req.body.location).split(',').map(x => +x) }
    const route = Object.assign(req.route, req.body);
    route.save()
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

    const route = {
        ...req.body,
        user: req.user.id
    }
    console.log(route)

    route.location = { type: 'Point', coordinates: (req.body.location).split(',').map(x => +x) }
    Route.create(route)
        .then(() => res.redirect('/routes'))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
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