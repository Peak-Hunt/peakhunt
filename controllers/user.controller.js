const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');
const createError = require('http-errors');
const mailer = require('../config/mailer.config');




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

  User.findOne({ email: req.body.email })
  .then((user) => {
    if (user) {
      renderWithErrors({ email: 'Email is already registered' });
    } else {
        return User.create(req.body)
        .then(() => res.redirect("/"))
    }
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
        console.log(error)
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
        console.log(error, validations)

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

  module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
  };
  