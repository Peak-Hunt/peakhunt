const User = require('../models/User.model');

module.exports.register = (req, res, next) => {
    res.render('users/register')

}