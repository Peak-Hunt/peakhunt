const Review = require('../models/reviews.model');
const Route = require('../models/route.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.doCreate = (req, res, next) => {
    const review = req.body;
    Review.create({
        rating: review.rating,
        description: review.description,
        route: req.route.id,
    }).then(() => res.redirect(`/route/${req.route.id}`))
        .catch(error => {
            console.log(error)
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
        .populate('route')
        .then(review => {
            if (review) {
                res.render('reviews/edit', { review })
            } else {
                next(createError(404, 'Route not found'));
            }
        }).catch(next);
}

module.exports.doEdit = (req, res, next) => {
    Review.findByIdAndUpdate(req.params.reviewId, { $set: req.body }, { runValidators: true })
        .then(review => {
            if (review) res.redirect(`/route/${review.route._id}`); // Doesn't work with just id
            else next(createError(404, 'Review does not exist'));
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                const review = req.body;
                review.id = req.params.reviewId;
                res.render('reviews/edit', {
                    errors: error.errors,
                    review
                })
            } else next(error);
        })
}

module.exports.delete = (req, res, next) => {
    Review.findByIdAndDelete(req.params.reviewId)
        .populate()
        .then(review => {
            if (review) res.redirect(`/route/${review.route._id}`);
            else next(createError(404, 'Review does not exist'));
        }).catch(next)
}