// backend/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account'); // Import the Account model

// Helper function to generate a random 12-digit account number
const generateAccountNumber = () => {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
};

// Function to register a new user
const registerUser = async (userData) => {
  const { username, password, fullName, idNumber } = userData;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      idNumber,
    });

    await newUser.save();

    // Generate a random 12-digit account number
    const accountNumber = generateAccountNumber();

    // Create a new account for the user
    const newAccount = new Account({
      userId: newUser._id,
      accountNumber: accountNumber,
      balance: 0.0, // Initial balance
    });

    await newAccount.save();

    return { message: 'User registered successfully', user: newUser };
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

// Function to log in a user
const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('No matching User found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // Generate a JWT for the user
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  const account = await Account.findOne({ userId: user._id });

  return { token, user: { id: user._id, username: user.username }, account };
};

// Function to add a transaction
const addTransaction = async (transactionData) => {
  const { userId, recipientName, recipientsBank, recipientsAccountNumber, amountToTransfer, swiftCode, transactionType, status } = transactionData;

  try {
    const newTransaction = new Transaction({
      userId,
      recipientName,
      recipientsBank,
      recipientsAccountNumber,
      amountToTransfer,
      swiftCode,
      transactionType,
      status,
    });

    await newTransaction.save();
    return { message: 'Transaction added successfully', transaction: newTransaction };
  } catch (error) {
    throw new Error('Transaction failed: ' + error.message);
  }
};

module.exports = { registerUser, loginUser, addTransaction };