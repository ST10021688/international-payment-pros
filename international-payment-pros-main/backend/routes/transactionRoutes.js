const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Get account details for a user
router.get('/:userId', async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.params.userId });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;