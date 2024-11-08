// backend/services/authService.js
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const crypto = require('crypto'); // For STRONG token IDS
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account');

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

// Function to register a new user
const registerUser = async (userData) => {
  const { firstName, lastName, email, username, password, idNumber } = userData;
=======
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (userData) => {
  const { username, password, fullName, accountNumber } = userData;
>>>>>>> 468b49c (Register page is fixed)

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
<<<<<<< HEAD
      firstName, 
      lastName, 
      email,
      username,
      password: hashedPassword,
      idNumber,
    });

    await newUser.save();

    // Generate account number and create account
    const accountNumber = await generateAccountNumber();
    const account = new Account({
      userId: newUser._id,
      accountNumber,
      balance: 0 
    });

    await account.save();

    return { message: 'User registered successfully', user: newUser };
  } catch (error) {
    console.error('Registration failed:', error); // Log the error for debugging
=======
      username,
      password: hashedPassword,
      fullName,
      accountNumber,
    });

    await newUser.save();
    return { message: 'User registered successfully', user: newUser };
  } catch (error) {
>>>>>>> 468b49c (Register page is fixed)
    throw new Error('Registration failed: ' + error.message);
  }
};

<<<<<<< HEAD
// generates STRONG token ID
const JWT_SECRET = crypto.randomBytes(64).toString('hex'); 

// Function to log in a user
const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
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

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return token;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed: ' + error.message);
  }
=======
const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('No matching User found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
>>>>>>> 468b49c (Register page is fixed)
};

module.exports = { registerUser, loginUser };