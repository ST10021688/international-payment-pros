// backend/services/authService.js
const bcrypt = require('bcrypt');
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

    // Generate account number and create account
    const accountNumber = await generateAccountNumber();
    const account = new Account({
      userId: newUser._id,
      accountNumber,
      balance: 0 // Initial balance
    });

    await account.save();

    return { message: 'User registered successfully', user: newUser };
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

const JWT_SECRET = "mytestsecret123"

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('No matching User found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = { registerUser, loginUser };