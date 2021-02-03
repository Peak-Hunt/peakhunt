const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: {
        type: String,
        minlength: [12, 'Your description is not long enough.']
    },
    rating: {
        type: Number,
        required: true
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;