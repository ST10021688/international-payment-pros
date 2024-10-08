const authService = require('../services/authService');
const { validationResult } = require('express-validator');

// Calls the registerUser function from authService
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calls the loginUser function from authService
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = await authService.loginUser(req.body.username, req.body.password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Calls the addTransaction function from authService
const addTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const transaction = await authService.addTransaction({ ...req.body, userId: req.user.id });
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (error) {
    console.error('Transaction error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Calls the getTransactions function from authService
const getTransactions = async (req, res, next) => {
  try {
    const transactions = await authService.getTransactions(req.user.id);
    res.json(transactions);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

module.exports = { register, login, addTransaction, getTransactions };