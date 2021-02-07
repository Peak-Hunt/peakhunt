const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
const createError = require('http-errors');
require('./config/hbs.config');
require('./config/db.config');

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

/* View setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* Routes */
const router = require('./config/routes.config');
app.use('/', router);

app.use((req, res, next) => {
	next(createError(404, 'Page not found'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.info(`PeakHunt listens at port ${port}`);
});