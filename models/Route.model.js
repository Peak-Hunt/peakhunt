const mongoose = require('mongoose');
const constants = require('../public/js/constants');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    title: {
        type: String,
        required: 'Please, enter a title.',
        maxlength: 80,
    },
    sport: {
        type: String,
        enum: constants.SPORTS,
        required: 'Please, select a sport.'
    },
    difficulty: {
        type: String,
        enum: constants.DIFFICULTIES,
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
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80'
    },
    video: {
        type: String
    }
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;