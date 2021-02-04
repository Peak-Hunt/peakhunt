const Review = require('../models/reviews.model');
const Route = require('../models/route.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.doCreate = (req, res, next) => {
    const { routeId } = req.params;
    const { description, rating } = req.body;
    let ratingRoute;

    Route.findById(routeId)
        .populate('reviews')
        .then(route => {
            ratingRoute = route;
            if (!route) {
                next(createError(404, 'Route not found'));
            } else {
                const review = new Review({
                    description,
                    rating,
                    route: route.id
                })
                return review.save()
                    .then(() => res.redirect(`/route/${route.id}`));
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('routes/detail', {
                    route: ratingRoute,
                    description,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        });
}