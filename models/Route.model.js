const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    title: {
        type: String,
        required: 'Please, enter a title.',
        maxlength: 80,
    },
    sport: {
        type: String,
        enum: ['Hiking', 'Mountaineering', 'Climbing', 'Ski', 'Mountain biking'],
        required: 'Please, select a sport.'
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard', 'Expert'],
        required: 'Please, enter the difficulty of this route.'
    },
    location: {
        type: String,
        required: 'Please, enter the location of this route.'
    },
    duration: {
        type: Number,
        required: 'Please, enter the duration of this route.'
    },
    description: {
        type: String,
        required: 'Please enter a description for this route.'
    },
    video: {
        type: String
    }
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;