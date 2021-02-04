const { db } = require('../models/User.model');
const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');

module.exports.register = (req, res, next) => {
  res.render("users/register");
};

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render("users/register", {
      user: req.body,
      errors: errors,
    });
  }

  const { email, password } = req.body;
  User.create({ email, password })
    .then((user) => {
      if (user) res.redirect("/");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.log(error);
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};


module.exports.doLogin = (req, res, next) => {
  passport.authenticate("local-auth", (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res
        .status(400)
        .render("users/login", { user: req.body, errors: validations });
    } else {
      req.login(user, (error) => {
        if (error) next(error);
        else res.redirect("/");
      });
    }
  })(req, res, next);
};

module.exports.loginWithGoogle = (req, res, next) => {
    passport.authenticate('google-auth', (error, user, validations) => {
      if (error) {
        next(error);
      } else if (!user) {
        res.status(400).render('users/login', { user: req.body, errors: validations });
      } else {
        req.login(user, error => {
          if (error) next(error)
          else res.redirect('/')
        })
      }
    })(req, res, next);
  }