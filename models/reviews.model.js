const mongoose = require('mongoose');
const Route = require('./route.model');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: {
        type: String,
        minlength: [3, 'Your description is not long enough.']
    },
    rating: {
        type: Number,
        required: 'Rating cannot be empty.',
        min: 1,
        max: 5
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: 'Review must belong to a route.'
    }
}, { timestamps: true });

reviewSchema.statics.calcAverageRatings = async function(route) {
    const stats = await this.aggregate([
        {
            $match: {route}
        },
        {
            $group: {
                _id: '$route',
                nRating: { $sum: 1 },
                avgRating: {$avg: '$rating'}
            }
        }
    ]);
    console.log(stats);
    if (stats.length > 0) {
        await Route.findByIdAndUpdate(route, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        })
    } else {
        await Route.findByIdAndUpdate(route, {
            ratingsQuantity: 0,
            ratingsAverage: 0
        })
    }
}

reviewSchema.post('save', function(next) {
    this.constructor.calcAverageRatings(this.route);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    next();
})

reviewSchema.post(/^findOneAnd/, async function() {
    await this.r.constructor.calcAverageRatings(this.r.route);
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;