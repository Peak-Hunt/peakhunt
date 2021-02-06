const Review = require('../models/reviews.model');
const Route = require('../models/route.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.doCreate = (req, res, next) => {
    const { description, rating } = req.body;
    Review.create({
        description,
        rating,
        route: req.route.id,
    }).then(() => res.redirect(`/route/${req.route.id}`))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('routes/detail', {
                    route: req.route,
                    review: req.body,
                    errors: error.errors
                });
            } else {
                next(error);
            }
        });
}

module.exports.edit = (req, res, next) => {
    const { reviewId } = req.params;
    Review.findById(reviewId)
        .then(review => {
            if (review) {
                res.render('reviews/edit', { review, route: req.route })
            } else {
                next(createError(404, 'Route not found'));
            }
        }).catch(next);
}