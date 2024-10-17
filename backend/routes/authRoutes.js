const express = require('express');
const authController = require('../controllers/authController'); // Import your authController
const router = express.Router();
const csrfProtection = require('../middleware/csrfProtectionMiddleware'); // Assuming csrfProtection is in the middleware folder
const rateLimiter = require('../middleware/rateLimiterMiddleware'); // Adjust the path as necessary
const User = require('../models/User');
const checkAuth = require('../middleware/checkAuth'); // Middleware to check JWT token
const Account = require('../models/Account'); // Adjust the path if necessary
const Transaction = require('../models/Transaction'); 



// User registration route
//router.post('/register', rateLimiter, authController.register); // This calls the register function in authController

router.post('/register', csrfProtection, rateLimiter, authController.register); // Add CSRF protection middleware

// User login route
router.post('/login', rateLimiter, authController.login); // This calls the login function in authController

// Route to get user info
router.get('/info', checkAuth, async (req, res) => {
    try {
        //const userId = req.user.id;

        const userId = req.user.id; // Extract user ID from the verified token
        console.log('Extracted User ID:', userId); // Log the user ID

        const user = await User.findById(userId).select('-password');
        console.log('User found:', user); // Log the user details

        const account = await Account.findOne({ userId: user._id });
        console.log('Account found:', account); // Log the account details

        if (!user) {
            console.error('User not found');
            return res.status(404).send({ error: "User not found" });
        }

        if (!account) {
            console.error('Account not found for user:', userId);
            return res.status(404).send({ error: "Account not found" });
        }

        res.status(200).send({
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                idNumber: user.idNumber,
            },
            account: {
                accountNumber: account.accountNumber,
                balance: account.balance,
            }
        });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).send({ error: 'Failed to retrieve user info' });
    }
});
/*
// POST a new payment
router.post('/transaction', async (req, res) => {
  const { userId, recipientName, recipientsBank, recipientsAccountNumber, amountToTransfer, swiftCode, transactionType, status } = req.body;

  try {
    const newPayment = new Payment({
        userId,
        recipientName,
        recipientsBank,
        recipientsAccountNumber,
        amountToTransfer,
        swiftCode,
        transactionType,
        status,
    });
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ error: 'Error processing payment' });
  }
});
*/

router.post('/transaction', checkAuth, authController.addTransaction);

router.get('/transactions', checkAuth, authController.getTransactions);

module.exports = router;