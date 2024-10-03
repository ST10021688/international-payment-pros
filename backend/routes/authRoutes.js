const express = require('express');
const authController = require('./authController'); // Import your authController
const router = express.Router();
const rateLimiter = require('../middleware/rateLimiterMiddleware'); // Import the rate limiter middleware

rateLimiter.rateLimiter
// User registration route
router.post('/register', authController.register); // This calls the register function in authController

// User login route
router.post('/login', authController.login); // This calls the login function in authController

module.exports = router;