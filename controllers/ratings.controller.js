const Rating = require('../models/ratings.model');
const Route = require('../models/route.model');
const mongoose = require('mongoose');

module.exports.doCreate = (req, res, next) => {
    const { routeId } = req.params;
    const { description, stars } = req.body;
    let ratingRoute;

    Route.findById(postId)
        .then(route => {
            ratingRoute = route;
            if (route) {
                return Rating.create({
                    description,
                    stars,
                    route: routeId
                }).then(rating => res.redirect(`/route/${routeId}`));
            } else {
                // ERROR 404!!
            }
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
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