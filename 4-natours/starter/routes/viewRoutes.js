const express = require('express');

const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);

router.get('/login', viewsController.getLoginForm);
// TODO: add signup route and controller and pug file

module.exports = router;
