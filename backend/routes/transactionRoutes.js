const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Handle transaction request
router.post('/', transactionController.createTransaction);

// Validate transaction
router.post('/:transactionId/validate', transactionController.validate);

// Reject transaction
router.post('/:transactionId/reject', transactionController.reject);

// Get transactions for a user
router.get('/:userId', transactionController.getTransactions);

// Get all transactions
router.get('/', transactionController.getAllTransactions);

module.exports = router;