const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
require('./config/hbs.config');
require('./config/db.config');

/* Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

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