const express = require('express');
const app = express();
const path = require('path');
require('./config/hbs.config');

/* Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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