const { processTransaction, validateTransaction, rejectTransaction } = require('../services/authService');
const Transaction = require('../models/Transaction');

// Handle transaction request
const createTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    console.log('Received transaction data:', transactionData);

    const result = await processTransaction(transactionData);
    console.log('Transaction processed successfully:', result);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Validate transaction
const validate = async (req, res) => {
  try {
    const result = await validateTransaction(req.params.transactionId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error validating transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject transaction
const reject = async (req, res) => {
  try {
    const result = await rejectTransaction(req.params.transactionId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error rejecting transaction:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get transactions for a user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    if (!transactions) {
      return res.status(404).json({ message: 'Transactions not found' });
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions) {
      return res.status(404).json({ message: 'Transactions not found' });
    }
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTransaction, validate, reject, getTransactions, getAllTransactions };