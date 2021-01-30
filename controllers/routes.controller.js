const Route = require('../models/Route.model');

module.exports.list = (req, res, next) => {
    // const sport = Route.schema.path('sport').enumValues;
    const filters = req.query;
    const { key } = req.query;
    const { location, sport, difficulty } = req.query;
    const criterial = Object.keys(filters)
        .filter((key => filters[key] !== 'all'))
        .reduce((criterial, filter) => {
            if (filters[filter]) criterial[filter] = filters[filter];
            return criterial;
        }, {});

        Route.find(criterial)
        .then(routes => {
            res.render('routes/list', { routes, location, sport, difficulty })
        })
        .catch(next) 
}