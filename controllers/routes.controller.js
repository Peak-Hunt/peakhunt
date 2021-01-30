consr Route = require('../models/route.model');
const constants = require('../public/js/constants');

module.exports.list = (req, res, next) => {
    const filters = req.query;
    const { location, sport, difficulty } = req.query;
    const criterial = Object.keys(filters)
        .filter((key => filters[key] !== 'All'))
        .reduce((criterial, filter) => {
            if (filters[filter]) criterial[filter] = filters[filter];
            return criterial;
        }, {});

        Route.find(criterial)
        .then(routes => {
            res.render('routes/list', { 
                routes, 
                location, 
                sport, 
                difficulty, 
                sportOptions: constants.SPORTS, 
                difficultyOptions: constants.DIFFICULTIES
            })
        })
        .catch(next) 
}