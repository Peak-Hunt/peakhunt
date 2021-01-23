const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const router = require('./config/routes.config');
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.info(`🏔️ PeakHunt listens at port ${port}`);
});