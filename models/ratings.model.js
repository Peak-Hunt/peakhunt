const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
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

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;