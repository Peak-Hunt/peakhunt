const constants = require('../public/js/constants');

module.exports.home = (req, res, next) => {
    res.render('common/home', {
        sportOptions: constants.SPORT_OPTIONS
    });
}