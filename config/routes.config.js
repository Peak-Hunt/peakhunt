const express = require('express');
const router = express.Router();
const passport = require('passport');
const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
const routesMid = require('../middlewares/routes.mid');
const commonController = require('../controllers/common.controller');
const routesController = require('../controllers/routes.controller');
const userController = require('../controllers/user.controller');
const reviewsController = require('../controllers/reviews.controller');
const secure = require('../middlewares/secure.middleware');
const storage = require('../config/storage.config');



router.get('/', commonController.home);
router.get('/routes', routesController.list);
router.get('/route/:id', routesMid.loadRoute, routesController.detail);
router.get('/route/:id/edit', secure.isAuthenticated, routesMid.loadRoute, routesController.edit);
router.post('/route/:id/edit', secure.isAuthenticated, routesMid.loadRoute, routesController.doEdit);
router.get('/routes/new', secure.isAuthenticated, routesController.create);
router.post('/routes', secure.isAuthenticated, routesController.doCreate);
router.post('/route/:id/delete', secure.isAuthenticated, routesMid.loadRoute, routesController.delete);
router.get('/my-routes', secure.isAuthenticated, routesController.myRoutes);

router.post('/route/:routeId/reviews', secure.isAuthenticated, routesMid.loadRoute, reviewsController.doCreate);
router.get('/review/:reviewId/edit', secure.isAuthenticated, reviewsController.edit);
router.post('/review/:reviewId/edit', secure.isAuthenticated, reviewsController.doEdit);
router.post('/route/:routeId/review/:reviewId/delete', secure.isAuthenticated, reviewsController.delete);

router.get('/activate', userController.activate);
router.get('/register', userController.register);
router.post('/register', userController.doRegister);
router.get('/login', userController.login);
router.post('/login', userController.doLogin);
router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/authenticate/google/cb', userController.loginWithGoogle)
router.get('/profile', secure.isAuthenticated, userController.profile);
router.post('/profile', secure.isAuthenticated, storage.single('avatar'), userController.doProfile); 
router.get('/logout', secure.isAuthenticated, userController.logout);

module.exports = router;