module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).redirect('/login');
    }
  };

module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(401).redirect('/settings');
    } else {
        next();
    }
};