const mongoose = require("mongoose");
const passport = require("passport");
const createError = require("http-errors");
const mailer = require("../config/mailer.config");
const User = require("../models/users.model");
const Route = require("../models/routes.model");
const flash = require("connect-flash");
const constants = require('../public/js/constants');
const crypto = require("crypto");

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
                renderWithErrors({ email: "Email is already registered " });
            } else {
                return User.create(req.body).then((user) => {
                    mailer.sendValidationEmail(
                        user.email,
                        user.verified.token,
                        user.name
                    );
                    req.flash("data", JSON.stringify({ verification: true }));
                    res.redirect("/login");
                });
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors);
            } else {
                error.name = 'This username has already been taken'
                res.render("users/register", {
                    user: req.body,
                    errors: error
                })
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
            console.log(validations)
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
    passport.authenticate("google-auth", (error, user, validations) => {
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

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect("/login");
};

module.exports.activate = (req, res, next) => {
    User.findOneAndUpdate(
        { "verified.token": req.query.token },
        { $set: { verified: { date: new Date(), token: null } } },
        { runValidators: true }
    )
        .then((user) => {
            if (!user) {
                next(createError(404, "Invalid activation token or expired"));
            } else {
                res.redirect("/login");
            }
        })
        .catch(next);
};

module.exports.settings = (req, res, next) => {
    User.findById(req.user.id)
        .then((user) => res.render("users/settings", { user }))
        .catch(next);
};

module.exports.doSettings = (req, res, next) => {
    function renderWithErrors(error) {
        console.log(error);

        Object.assign(req.user, req.body);
        res.status(400).render("users/settings", {
            user: req.user,
            errors: error,
        });
    }

    const { password, passwordMatch, name } = req.body;
    if (password && password !== passwordMatch) {
        renderWithErrors({ passwordMatch: "Passwords do not match" });
    } else {
        const updateFields = { name };
        if (req.file) {
            updateFields.avatar = req.file.path;
        }
        if (password) {
            updateFields.password = password;
        }

        Object.assign(req.user, updateFields);
        req.user
            .save()
            .then((user) => {
                req.login(user, (error) => {
                    if (error) next(error);
                    else res.redirect("/settings");
                });
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    renderWithErrors(error.errors);
                } else {
                    next(error);
                }
            });
    }
};

module.exports.profile = (req, res, next) => {
    User.findOne({ name: req.params.username })
        .then(user => {
            Route.find({ user: user.id })
                .then((routes) => {
                    console.log(routes)
                    res.render('users/profile', {
                        user,
                        routes,
                        sportOptions: constants.SPORT_OPTIONS,
                        difficultyOptions: constants.DIFFICULTY_OPTIONS,
                    });
                })
        })
        .catch(next);
}

module.exports.forgot = (req, res, next) => {
    res.render('users/forgot', {
      user: req.user
    });
  };

  module.exports.forgot = (req, res, next) => {
    const tokenSinString = crypto.randomBytes(20)
    var token = tokenSinString.toString('hex')
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          res.status(400).render('users/forgot', {
            email: req.body.email,
          })
        } else {
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;
          User.findById(user.id, )
            .then(user => {
              const token = user.resetPasswordToken
              const email = user.email
              mailer.sendForgotMail(token, email);
              res.render('users/forgot', {
                user: user,
                verification: true
              })
            })
        }
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          renderWithErrors(error.errors);
        } else {
          next(error);
        };
      });
  };

  