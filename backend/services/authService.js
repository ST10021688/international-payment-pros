// backend/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Employee = require('../models/Employee');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
require('dotenv').config(); // Load environment variables

// Function to generate a unique bank account number
const generateAccountNumber = async () => {
  let accountNumber;
  let isUnique = false;

  while (!isUnique) {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generate a 10-digit number
    const existingAccount = await Account.findOne({ accountNumber });
    if (!existingAccount) {
      isUnique = true;
    }
  }
  return accountNumber;
};

//---------------------------------------------------------------------------------------------------------//
// Function to register a new user
const registerUser = async (userData) => {
  const { firstName, lastName, email, username, password, idNumber, userType } = userData;

  try {
    if (userType === 'employee') {
      const existingEmployee = await Employee.findOne({ username });
      if (existingEmployee) {
        throw new Error('Username already taken');
      }

      const newEmployee = new Employee({
        firstName, 
        lastName, 
        email,
        username,
        password,
        idNumber
      });

      await newEmployee.save();
      return { message: 'Employee registered successfully', user: newEmployee };
    } else {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already taken');
      }

      const newUser = new User({
        firstName, 
        lastName, 
        email,
        username,
        password,
        idNumber
      });

      await newUser.save();

      // Generate account number and create account
      const accountNumber = await generateAccountNumber();
      const account = new Account({
        userId: newUser._id,
        accountNumber,
        balance: 10000 
      });

      await account.save();
      return { message: 'User registered successfully', user: newUser };
    }
  } catch (error) {
    console.error('Registration failed:', error); // Log the error for debugging
    throw new Error('Registration failed: ' + error.message);
  }
};

//---------------------------------------------------------------------------------------------------------//
// Function to log in a user
const loginUser = async (username, password) => {
  try {
    let user = await User.findOne({ username });
    let userType = 'customer';

    if (!user) {
      user = await Employee.findOne({ username });
      userType = 'employee';
    }

    if (!user) {
      console.error('No matching User found');
      throw new Error('No matching User found');
    }

    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Incorrect password');
      throw new Error('Incorrect password');
    }

    console.log('Password match:', isMatch);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { ...user.toObject(), userType, token };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed: ' + error.message);
  }
};

//---------------------------------------------------------------------------------------------------------//
// Function to process a transaction
const processTransaction = async (transactionData) => {
  const { userId, recipientName, recipientsBank, recipientsAccountNumber, amountToTransfer, swiftCode, transactionType, status, date } = transactionData;
  try {
    if (!userId || !recipientName || !recipientsBank || !recipientsAccountNumber || !amountToTransfer || !transactionType || !status || !date) {
      throw new Error('Missing required transaction data');
    }
    console.log('Processing transaction data:', transactionData);

    // Ensure amountToTransfer is a positive value
    if (amountToTransfer <= 0) {
      throw new Error('Transaction amount must be a positive number');
    }

    const newTransaction = new Transaction({
      userId,
      recipientName,
      recipientsBank,
      recipientsAccountNumber,
      amountToTransfer,
      swiftCode,
      transactionType,
      status,
      date,
    });

    // Find the user's account
    const userAccount = await Account.findOne({ userId });

    // If the user does not have an account, throw an error
    if (!userAccount) {
      throw new Error('Account not found for user');
    }

    // Check if the user has sufficient balance
    if (userAccount.balance < amountToTransfer) {
      throw new Error('Insufficient funds');
    }

    await newTransaction.save();

    // Subtract the amount from the user's account balance
    userAccount.balance -= amountToTransfer;

    // Save the updated account balance
    await userAccount.save();

    return { message: 'Transaction processed successfully', transaction: newTransaction };
  } catch (error) {
    console.error('Transaction processing failed:', error); // Log the error for debugging
    throw new Error('Transaction processing failed: ' + error.message);
  }
};

const validateTransaction = async (transactionId) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    transaction.status = 'Validated';
    await transaction.save();
    return { message: 'Transaction validated successfully', transaction };
  } catch (error) {
    console.error('Transaction validation failed:', error);
    throw new Error('Transaction validation failed: ' + error.message);
  }
};

const rejectTransaction = async (transactionId) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    transaction.status = 'Rejected';
    await transaction.save();
    return { message: 'Transaction rejected successfully', transaction };
  } catch (error) {
    console.error('Transaction rejection failed:', error);
    throw new Error('Transaction rejection failed: ' + error.message);
  }
};

//---------------------------------------------------------------------------------------------------------//

module.exports = { registerUser, loginUser, processTransaction, validateTransaction, rejectTransaction };
