const Route = require("../models/routes.model");

module.exports.loadRoute = (req, res, next) => {
    const { routeId, id } = req.params;
    Route.findById(routeId || id) //CheckRoll--> Admin mirar la clase Passport class (un martes)
        .populate('user')
        .populate({
            path: 'reviews',
            populate: {
                path: 'user',
            },
        })
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
