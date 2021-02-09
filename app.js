require('dotenv').config();

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const passport = require('passport');
const session = require('./config/session.config');

require('./config/hbs.config');
require('./config/db.config');
require('./config/passport.config');

const app = express();

/* Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());



/* View setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* Routes */
const router = require('./config/routes.config');
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.info(`PeakHunt listens at port ${port}`);
});