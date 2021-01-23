const express = require('express');
const router = express.Router();

const commonController = require('../controllers/common.controller');

router.get('/', commonController.home);

module.exports = router;