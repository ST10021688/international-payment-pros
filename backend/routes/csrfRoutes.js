const express = require('express');
const csrfProtection = require('../middleware/csrfProtectionMiddleware');
const router = express.Router();

router.get('/csrf-token', csrfProtection, (req, res) => {
    try {
        const token = req.csrfToken();
        console.log('Generated CSRF Token:', token); // Log CSRF token
        res.json({ csrfToken: token });
    } catch (error) {
        console.error('Failed to generate CSRF token:', error);
        res.status(500).json({ message: 'Could not generate CSRF token' });
    }
});

module.exports = router;
