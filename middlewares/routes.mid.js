const Route = require("../models/route.model");

module.exports.loadRoute = (req, res, next) => {
    const { routeId, id } = req.params;

    Route.findById(routeId || id) //CheckRoll--> Admin mirar la clase Passport class (un martes)
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
