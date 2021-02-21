const mongoose = require('mongoose');
const Route = require('./routes.model');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: {
        type: String,
        minlength: [3, 'Your description is not long enough.']
    },
    rating: {
        type: Number,
        required: 'Rating cannot be empty.',
        min: 0.5,
        max: 5
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: 'Review must belong to a route.'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: 'Review must belong to a user'
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

reviewSchema.index({ route: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (route) {
    const stats = await this.aggregate([
        {
            $match: { route }
        },
        {
            $group: {
                _id: '$route',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    if (stats.length > 0) {
        await Route.findByIdAndUpdate(route, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: Math.round(stats[0].avgRating * 10) / 10 //toFixed doesnt show .0 when n.0, just n
        })
    } else {
        await Route.findByIdAndUpdate(route, {
            ratingsQuantity: 0,
            ratingsAverage: 0
        })
    }
}

reviewSchema.post('save', function (next) {
    this.constructor.calcAverageRatings(this.route);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
})

reviewSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcAverageRatings(this.r.route);
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;