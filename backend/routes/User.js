const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');
const userValidator = require('../middleware/userValidator');
const limiter = require('../middleware/rateLimit');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter.loginLimiter, userCtrl.login);

module.exports = router;