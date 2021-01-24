const express = require('express');
const router = express.Router();

const commonController = require('../controllers/common.controller');
const routesController = require('../controllers/routes.controller');

router.get('/', commonController.home);
router.get('/routes', routesController.list)

module.exports = router;