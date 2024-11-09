const express = require('express');
const authController = require('../controllers/authController'); // Import your authController
const router = express.Router();
const rateLimiter = require('../middleware/rateLimiterMiddleware'); // Adjust the path as necessary

// User registration route
router.post('/register', rateLimiter, authController.register); // This calls the register function in authController

// User login route
router.post('/login', rateLimiter, authController.login); // This calls the login function in authController

module.exports = router;