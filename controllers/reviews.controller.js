const Rating = require('../models/reviews.model');
const Route = require('../models/route.model');
const mongoose = require('mongoose');

module.exports.doCreate = (req, res, next) => {
    const { routeId } = req.params;
    const { description, rating } = req.body;
    let ratingRoute;

    Route.findById(routeId)
        .then(route => {
            ratingRoute = route;
            if (route) {
                return Rating.create({
                    description,
                    rating,
                    route: routeId
                }).then(() => res.redirect(`/route/${routeId}`));
            } else {
                next(createError(404, 'Post not found'));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.log(error)
                res.render('routes/detail', {
                    route: ratingRoute,
                    errors: error.errors,
                    rating: req.body
                });
            } else {
                next(error);
            }
        });
}