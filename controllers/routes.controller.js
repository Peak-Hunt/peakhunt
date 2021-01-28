const Route = require('../models/Route.model');

module.exports.list = (req, res, next) => {
    const filters = req.query;
    const criterial = Object.keys(filters)
        .filter((key => filters[key] !== 'all'))
        .reduce((criterial, filter) => {
            if (filters[filter]) {
            criterial[filter] = filters[filter];
            }
            return criterial;
        }, {});

        Route.find(criterial)
        .then(routes => {
            console.log(criterial)
            res.render('routes/list', { routes, filters })
        })
        .catch(next) 
}