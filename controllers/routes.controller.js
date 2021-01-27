const Route = require('../models/Route.model');

module.exports.list = (req, res, next) => {
    Route.find()
        .then(routes => res.render('routes/list', { routes }))
        .catch(next)
}