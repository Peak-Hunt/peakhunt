const express = require('express');
const router = express.Router();
const passport = require('passport');
const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
const routesMid = require('../middlewares/routes.mid');
const commonController = require('../controllers/common.controller');
const routesController = require('../controllers/routes.controller');
const userController = require('../controllers/user.controller');
const reviewsController = require('../controllers/reviews.controller');


router.get('/', commonController.home);
router.get('/routes', routesController.list);
router.get('/route/:id', routesMid.loadRoute, routesController.detail);
router.get('/route/:id/edit', routesMid.loadRoute, routesController.edit);
router.post('/route/:id/edit', routesMid.loadRoute, routesController.doEdit);
router.get('/routes/new', routesController.create);
router.post('/routes', routesController.doCreate);
router.post('/route/:id/delete', routesMid.loadRoute, routesController.delete);
router.get('/routes-within/:distance/center/:latlng/', routesController.routesWithin);

router.post('/route/:routeId/reviews', routesMid.loadRoute, reviewsController.doCreate);
router.get('/review/:reviewId/edit', reviewsController.edit);
router.post('/review/:reviewId/edit', reviewsController.doEdit);
router.post('/review/:reviewId/delete', reviewsController.delete);

router.get('/register', userController.register);
router.post('/register', userController.doRegister);
router.get('/login', userController.login);
router.post('/login', userController.doLogin);
router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/authenticate/google/cb', userController.loginWithGoogle)

module.exports = router;