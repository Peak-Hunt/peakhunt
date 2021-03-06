const mongoose = require('mongoose');
const { route } = require('../config/routes.config');
const constants = require('../public/js/constants');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    title: {
        type: String,
        required: 'Please, enter a title for this route.',
        maxlength: 80,
    },
    sport: {
        type: String,
        enum: constants.SPORTS.map(sport => sport.key),
        required: 'Please, select a sport.'
    },
    difficulty: {
        type: String,
        enum: constants.DIFFICULTIES,
        required: 'Please, enter the difficulty of this route.'
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number]
    },
    locationAddress: {
        type: String,
        required: 'Please, select a location.'
    },
    duration: {
        type: Number,
        required: 'Duration is required.'
    },
    elevationGained: {
        type: Number,
        required: 'Elevation gained is required.'
    },
    elevationLost: {
        type: Number,
        required: 'Elevation lost is required.'
    },
    distance: {
        type: Number,
        required: 'Distance is required.'
    },
    description: {
        type: String,
        required: 'Please, enter a description for this route.'
    },
    image: {
        type: String,
        required: 'Please, provide an image from this rote.',
        default: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80'
    },
    video: {
        type: String
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    
}, {
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


routeSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'route',
})

routeSchema.index({ location: '2dsphere' }),

routeSchema.pre('save', function (next) {
    if (this.video) {
        const videoCode = this.video.split('?v=')[1];
        this.video = `http://www.youtube.com/embed/${videoCode}`;
        next();
    } else next();
})

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;