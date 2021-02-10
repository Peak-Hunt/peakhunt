const mongoose = require("mongoose");
const Route = require("../models/Route.model");
require('../config/db.config');

const routes = [
    {
        title: 'Säntis via Lisengrat',
        sport: 'hiking',
        difficulty: 'Medium',
        location: 'Appenzell, Switzerland',
        duration: 5,
        description: 'Interesting and exposed route through the eastern swiss alps.',
        image: 'https://static.az-cdn.ch/__ip/dd6Mbuh7EOJyH6SzgW4JEXrQY70/788615ca7370e56f2c91d2373bd8124e20b9459c/n-ch12-16x9-far'
    },
    {
        title: 'Matterhorn via Hörnli Ridge',
        sport: 'mountaineering',
        difficulty: 'Expert',
        location: 'Zermatt, Switzerland',
        duration: 16,
        description: 'Climb the most famous mountain in Switzerland!.',
        image: 'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
        video: 'https://www.youtube.com/watch?v=WMvCgc9YzZA'
    },
    {
        title: 'Mont Blanc via Gouter',
        sport: 'mountaineering',
        difficulty: 'Expert',
        location: 'Chamonix, Switzerland',
        duration: 16,
        description: 'Climb the highest mountain in Europe!.',
        image: 'https://images.unsplash.com/photo-1522527414937-8b7363e8701d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80',
        video: 'https://www.youtube.com/watch?v=WCLAHDCSdgE'
    },
];

Route.create(routes)
    .then(routes => {
        console.log(`New routes added: ${routes}`);
        mongoose.connection.close();
    })
    .catch(error => console.log(error));