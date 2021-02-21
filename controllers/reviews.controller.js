const Review = require('../models/reviews.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

module.exports.doCreate = (req, res, next) => {
    const review = req.body;
    Review.create({
        rating: review.rating,
        description: review.description,
        route: req.route.id,
        user: req.user.id
    }).then(() => res.redirect(`/route/${req.route.id}`))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('routes/detail', {
                    route: req.route,
                    review: req.body,
                    errors: error.errors
                });
            } else {
                error.duplicate = 'You can only post one review per route.'
                res.render('routes/detail', {
                    route: req.route,
                    review: req.body,
                    errors: error
                })
            }
        });
}

module.exports.edit = (req, res, next) => {
    const { reviewId } = req.params;
    Review.findById(reviewId)
        .populate('route')
        .then(review => {
            if (JSON.stringify(review.user) == JSON.stringify(req.user.id)) {
                res.render('reviews/edit', { review })
            } else if (review) {
                res.redirect(`/route/${review.route.id}`)
            } else {
                next(createError(404, 'Review not found'));
            }
        }).catch(next);
}

module.exports.doEdit = (req, res, next) => {
    Review.findOneAndUpdate({ _id: req.params.reviewId, user: req.user.id }, { $set: req.body }, { runValidators: true })
        .then(review => {
            if (review) res.redirect(`/route/${review.route._id}`);
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
    const { routeId } = req.params;
    Review.findOneAndDelete({ _id: req.params.reviewId, user: req.user.id })
        .then(review => {
            if (review) res.redirect(`/route/${review.route}`);
            else next(createError(404, 'Review does not exist'));
        })
        .catch(() => {
            res.redirect(`/route/${routeId}`);
        })
}