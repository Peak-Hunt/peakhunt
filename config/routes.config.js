const express = require('express');
const router = express.Router();

const commonController = require('../controllers/common.controller');
const routesController = require('../controllers/routes.controller');
const userController = require('../controllers/user.controller');

router.get('/', commonController.home);
router.get('/routes', routesController.list);
router.get('/route/:id', routesController.detail);

router.get('/register', userController.register);

module.exports = router;