const Route = require("../models/routes.model");
const createError = require('http-errors');

module.exports.loadRoute = (req, res, next) => {
    const { routeId, id } = req.params;

    Route.findById(routeId || id)
        .populate('reviews')
        .populate('user')
        .then(route => {
            if (route) {
                req.route = route;
                next();
            } else {
                next(createError(404, 'Route not found'));
            }
        })
        .catch(next);
}
