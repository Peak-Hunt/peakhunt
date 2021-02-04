const express = require('express');
const router = express.Router();
const passport = require('passport');
const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']


const commonController = require('../controllers/common.controller');
const routesController = require('../controllers/routes.controller');
const userController = require('../controllers/user.controller');

router.get('/', commonController.home);
router.get('/routes', routesController.list)
router.get('/register', userController.register);
router.post('/register', userController.doRegister);
router.get('/login', userController.login);
router.post('/login', userController.doLogin);
router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/authenticate/google/cb', userController.loginWithGoogle)

module.exports = router;