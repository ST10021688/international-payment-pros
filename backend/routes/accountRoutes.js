const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Get account details for a user
router.get('/:userId', accountController.getAccountDetails);

module.exports = router;